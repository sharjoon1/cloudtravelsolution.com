import type { Metadata } from "next";
import Image from "next/image";
import {
  Users,
  MapPin,
  Mail,
  Award,
  Building2,
  Globe,
  Clock,
  Briefcase,
  ArrowRight,
} from "lucide-react";
import { getPayload } from "payload";
import config from "@payload-config";
import { connection } from "next/server";

import { Breadcrumb } from "@/components/ui/breadcrumb";
import { CTABanner } from "@/components/sections/cta-banner";

export const metadata: Metadata = {
  title: "Our Team — Meet the People Behind Cloud Travel Solutions",
  description:
    "Meet the experienced team at Cloud Travel Solutions. Our visa consultants, travel advisors, and support staff are dedicated to making your international travel seamless.",
};

const stats = [
  { icon: Clock, label: "Years Experience", value: "20+" },
  { icon: Users, label: "Staff", value: "50+" },
  { icon: Building2, label: "City Offices", value: "4" },
  { icon: Globe, label: "Happy Clients", value: "10,000+" },
];

interface CMSTeamMember {
  id: number;
  name: string;
  role: string;
  department: string;
  photo?: { url?: string } | null;
  bio?: string | null;
  experience?: string | null;
  location?: { city?: string } | null;
  email?: string | null;
  sortOrder?: number | null;
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export default async function TeamPage() {
  await connection();
  let members: CMSTeamMember[] = [];

  try {
    const payload = await getPayload({ config });
    const result = await payload.find({
      collection: "team-members",
      sort: "sortOrder",
      limit: 50,
    });
    members = result.docs as unknown as CMSTeamMember[];
  } catch {
    // Fallback to empty — admin needs to add team members
  }

  const leadership = members.filter((m) => m.department === "leadership");
  const management = members.filter((m) => m.department === "management");
  const specialists = members.filter((m) => m.department === "specialists");
  const team = members.filter((m) => m.department === "team");
  const hasMembers = members.length > 0;

  return (
    <>
      <Breadcrumb
        items={[
          { name: "Home", href: "/" },
          { name: "About", href: "/about" },
          { name: "Our Team", href: "/about/team" },
        ]}
      />

      <div className="bg-[#e3ebf9]">
        {/* Hero */}
        <div className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-dark)] text-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
            <div className="max-w-3xl">
              <h1 className="text-4xl sm:text-5xl font-bold mb-4">Our Team</h1>
              <p className="text-lg text-white/80 leading-relaxed">
                Behind every successful visa application and seamless travel
                experience is a dedicated team of professionals. Meet the people
                who make Cloud Travel Solutions India&apos;s trusted travel partner.
              </p>
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="border-b border-border">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-border">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="flex items-center gap-3 py-6 px-4 lg:px-6"
                >
                  <stat.icon className="h-6 w-6 text-[var(--color-primary)] shrink-0" />
                  <div>
                    <div className="text-2xl font-bold text-foreground">
                      {stat.value}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {stat.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {!hasMembers && (
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 text-center">
            <Users className="h-16 w-16 text-[#0c6cbc]/30 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-[#0c6cbc] mb-2">Team Coming Soon</h2>
            <p className="text-muted-foreground">Our team details are being updated. Check back soon!</p>
          </div>
        )}

        {/* Leadership Section */}
        {leadership.length > 0 && (
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-[#0c6cbc] mb-3">
                Leadership
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Our leadership team brings decades of combined experience in
                travel, visa consulting, and corporate management.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {leadership.map((member) => (
                <MemberCard key={member.id} member={member} size="large" />
              ))}
            </div>
          </div>
        )}

        {/* Management Section */}
        {management.length > 0 && (
          <div className="bg-[var(--color-muted)]">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-[#0c6cbc] mb-3">
                  Management
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {management.map((member) => (
                  <MemberCard key={member.id} member={member} size="medium" />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Specialists Section */}
        {specialists.length > 0 && (
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-[#0c6cbc] mb-3">
                Our Specialists
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {specialists.map((member) => (
                <MemberCard key={member.id} member={member} size="medium" />
              ))}
            </div>
          </div>
        )}

        {/* Team Section */}
        {team.length > 0 && (
          <div className="bg-[var(--color-muted)]">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-[#0c6cbc] mb-3">
                  Our Team
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {team.map((member) => (
                  <MemberCard key={member.id} member={member} size="small" />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Join Our Team */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
          <div className="text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-[var(--color-accent)]/10 mb-5">
              <Briefcase className="h-7 w-7 text-[var(--color-accent)]" />
            </div>
            <h2 className="text-3xl font-bold text-[#0c6cbc] mb-3">
              Join Our Team
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              We&apos;re always looking for passionate individuals who share our
              vision of making international travel accessible. If you love
              travel and want to grow your career — we&apos;d love to hear from you.
            </p>
            <a
              href="mailto:careers@cloudtravelsolution.com"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-[var(--color-accent)] hover:bg-[var(--color-accent-dark)] text-white font-semibold rounded-lg transition-colors"
            >
              <Mail className="h-4 w-4" />
              careers@cloudtravelsolution.com
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>

      <CTABanner />
    </>
  );
}

function MemberCard({ member, size }: { member: CMSTeamMember; size: "large" | "medium" | "small" }) {
  const photoUrl = member.photo?.url;
  const locationName = typeof member.location === "object" ? member.location?.city : null;

  if (size === "large") {
    return (
      <div className="p-8 rounded-xl border border-[#dadce0] bg-white shadow-sm hover:shadow-lg transition-shadow">
        <div className="flex items-center gap-4 mb-5">
          {photoUrl ? (
            <Image
              src={photoUrl}
              alt={member.name}
              width={80}
              height={80}
              className="h-20 w-20 rounded-full object-cover border-2 border-[#0c6cbc]/20"
            />
          ) : (
            <div className="h-20 w-20 rounded-full bg-[#0c6cbc] flex items-center justify-center text-white text-xl font-bold shrink-0">
              {getInitials(member.name)}
            </div>
          )}
          <div>
            <h3 className="text-lg font-bold text-foreground">{member.name}</h3>
            <p className="text-sm font-medium text-[#0c6cbc]">{member.role}</p>
          </div>
        </div>
        {member.bio && (
          <p className="text-sm text-muted-foreground leading-relaxed mb-5">{member.bio}</p>
        )}
        <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
          {locationName && (
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5" />
              {locationName}
            </span>
          )}
          {member.experience && (
            <span className="inline-flex items-center gap-1.5">
              <Award className="h-3.5 w-3.5" />
              {member.experience}
            </span>
          )}
        </div>
      </div>
    );
  }

  if (size === "medium") {
    return (
      <div className="p-6 bg-white rounded-xl border border-[#dadce0] shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center gap-3 mb-4">
          {photoUrl ? (
            <Image
              src={photoUrl}
              alt={member.name}
              width={56}
              height={56}
              className="h-14 w-14 rounded-full object-cover border-2 border-[#0c6cbc]/20"
            />
          ) : (
            <div className="h-14 w-14 rounded-full bg-[#0c6cbc] flex items-center justify-center text-white text-sm font-bold shrink-0">
              {getInitials(member.name)}
            </div>
          )}
          <div>
            <h3 className="font-semibold text-foreground">{member.name}</h3>
            <p className="text-sm text-[#0c6cbc]">{member.role}</p>
          </div>
        </div>
        {member.bio && (
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">{member.bio}</p>
        )}
        <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
          {locationName && (
            <span className="inline-flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {locationName}
            </span>
          )}
          {member.experience && (
            <span className="inline-flex items-center gap-1">
              <Award className="h-3 w-3" />
              {member.experience}
            </span>
          )}
        </div>
      </div>
    );
  }

  // small
  return (
    <div className="p-5 bg-white rounded-xl border border-[#dadce0] shadow-sm hover:shadow-md transition-shadow text-center">
      {photoUrl ? (
        <Image
          src={photoUrl}
          alt={member.name}
          width={64}
          height={64}
          className="h-16 w-16 rounded-full object-cover border-2 border-[#0c6cbc]/20 mx-auto mb-3"
        />
      ) : (
        <div className="h-16 w-16 rounded-full bg-[#0c6cbc] flex items-center justify-center text-white font-bold mx-auto mb-3">
          {getInitials(member.name)}
        </div>
      )}
      <h3 className="font-semibold text-foreground text-sm">{member.name}</h3>
      <p className="text-xs text-[#0c6cbc]">{member.role}</p>
    </div>
  );
}
