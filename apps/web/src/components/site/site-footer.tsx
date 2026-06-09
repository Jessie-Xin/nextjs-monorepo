import { Mail, MapPin, Phone } from "lucide-react";

import { getPublicPortfolio } from "@/lib/portfolio-data";

export async function SiteFooter() {
  const payload = await getPublicPortfolio();
  const profile = payload.state === "ready" ? payload.portfolio.profile : null;

  return (
    <footer className="border-t border-neutral-200 bg-white px-5 py-10 sm:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 text-sm text-neutral-600 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-base font-semibold text-neutral-950">
            {profile?.name ?? "履歷作品集"}
          </p>
          <p className="mt-1">
            {profile?.subtitle ?? profile?.jobTitle ?? "資料尚未公開"}
          </p>
        </div>
        {profile && (
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {profile.city && (
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="size-4" />
                {profile.city}
              </span>
            )}
            {profile.phone && (
              <span className="inline-flex items-center gap-1.5">
                <Phone className="size-4" />
                {profile.phone}
              </span>
            )}
            <span className="inline-flex items-center gap-1.5">
              <Mail className="size-4" />
              {profile.email}
            </span>
          </div>
        )}
      </div>
    </footer>
  );
}
