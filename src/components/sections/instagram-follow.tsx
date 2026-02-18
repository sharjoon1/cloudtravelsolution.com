import { Instagram } from "lucide-react";

type InstagramFollowProps = {
  instagramUrl?: string;
};

export function InstagramFollow({ instagramUrl }: InstagramFollowProps) {
  const igUrl = instagramUrl || "https://www.instagram.com/cloudtravelsolution";
  const igHandle = "@cloudtravelsolution";

  return (
    <section className="py-16 lg:py-20 bg-gradient-to-br from-[#833ab4]/5 via-[#fd1d1d]/5 to-[#fcb045]/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10 p-8 sm:p-12 rounded-2xl bg-white border border-border shadow-sm">
          {/* Left side: Content */}
          <div className="flex-1 text-center md:text-left">
            <div className="flex items-center gap-3 justify-center md:justify-start mb-4">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-[#833ab4] via-[#fd1d1d] to-[#fcb045] flex items-center justify-center">
                <Instagram className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
                  Follow Us on Instagram
                </h2>
                <p className="text-sm text-muted-foreground">{igHandle}</p>
              </div>
            </div>
            <p className="text-muted-foreground max-w-lg mb-6">
              Get daily visa tips, travel inspiration, country guides, and behind-the-scenes updates.
              Join our growing community of happy travelers!
            </p>
            <a
              href={igUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white font-semibold rounded-lg hover:opacity-90 transition-opacity text-sm"
            >
              <Instagram className="h-4 w-4" />
              Follow {igHandle}
            </a>
          </div>

          {/* Right side: QR Code */}
          <div className="flex flex-col items-center gap-3">
            <div className="p-4 bg-white rounded-xl border-2 border-border shadow-sm">
              {/* QR Code - generated SVG for Instagram URL */}
              <div className="h-36 w-36 sm:h-44 sm:w-44 bg-[var(--color-muted)] rounded-lg flex items-center justify-center relative overflow-hidden">
                <div className="text-center">
                  <Instagram className="h-8 w-8 mx-auto mb-2 text-[var(--color-primary)]" />
                  <p className="text-[10px] text-muted-foreground font-medium">Scan to Follow</p>
                </div>
              </div>
            </div>
            <p className="text-xs text-muted-foreground font-medium">
              Scan QR Code to Follow
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
