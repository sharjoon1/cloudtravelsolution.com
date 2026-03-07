import { NextRequest } from "next/server";
import { buildChatSystemPrompt, type ChatMessage } from "@/lib/chat-context";

const CLAWDBOT_URL = "http://127.0.0.1:18800";

// Simple in-memory rate limiting
const rateLimitMap = new Map<string, number>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const last = rateLimitMap.get(ip) || 0;
  if (now - last < 2000) return true;
  rateLimitMap.set(ip, now);
  if (rateLimitMap.size > 1000) {
    const cutoff = now - 60000;
    rateLimitMap.forEach((time, key) => {
      if (time < cutoff) rateLimitMap.delete(key);
    });
  }
  return false;
}

async function callClawdbot(prompt: string): Promise<string> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 30000);

  try {
    const res = await fetch(CLAWDBOT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: prompt }),
      signal: controller.signal,
    });

    if (!res.ok) {
      throw new Error(`Clawdbot HTTP ${res.status}`);
    }

    const json = await res.json();
    if (json.status !== "ok") throw new Error(`Clawdbot: ${json.status}`);
    return json.result?.payloads?.[0]?.text || "";
  } finally {
    clearTimeout(timeout);
  }
}

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown";
    if (isRateLimited(ip)) {
      return Response.json({ error: "Please wait a moment before sending another message." }, { status: 429 });
    }

    const { message, history = [] } = await request.json() as {
      message: string;
      history: ChatMessage[];
    };

    if (!message?.trim()) {
      return Response.json({ error: "Message required" }, { status: 400 });
    }

    if (message.length > 2000) {
      return Response.json({ error: "Message too long (max 2000 characters)" }, { status: 400 });
    }

    const systemPrompt = buildChatSystemPrompt(message);

    // Build combined prompt — keep last 4 messages only for speed
    let prompt = `[System Instructions]\n${systemPrompt}\n\n`;
    for (const msg of history.slice(-4)) {
      if (msg.role === "user") prompt += `[User]\n${msg.content}\n\n`;
      else if (msg.role === "assistant") prompt += `[CTS-AI]\n${msg.content}\n\n`;
    }
    prompt += `[User]\n${message}`;

    // SSE stream response
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          const text = await callClawdbot(prompt);
          const chunkSize = 40;
          for (let i = 0; i < text.length; i += chunkSize) {
            const chunk = text.slice(i, i + chunkSize);
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text: chunk })}\n\n`));
          }
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ done: true })}\n\n`));
        } catch {
          const fallback = "I'm having trouble connecting right now. Please try again, or reach us directly:\n\n\u{1F4DE} Call: +91 9632132143\n\u{1F4AC} WhatsApp: wa.me/919632132143\n\nOur visa specialists are happy to help!";
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text: fallback, done: true })}\n\n`));
        }
        controller.close();
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch {
    return Response.json({ error: "Internal error" }, { status: 500 });
  }
}
