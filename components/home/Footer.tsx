import Link from 'next/link';
import { AppImage } from '@/components/shared';
import { mapLocalizedString, mapFooterLink } from '@/lib/sanity/mappers';
import type { SiteSettings } from '@/lib/sanity/types';

interface FooterProps {
  siteSettings: SiteSettings | null;
  locale: string;
}

export function Footer({ siteSettings, locale }: FooterProps) {
  if (!siteSettings) return null;

  const siteName = mapLocalizedString(siteSettings.siteName, locale);
  const tagline = mapLocalizedString(siteSettings.siteTagline, locale);
  const copyrightText = mapLocalizedString(siteSettings.copyrightText, locale);
  const navLinks = siteSettings.navLinks ?? [];
  const footerLinks = siteSettings.footerLinks ?? siteSettings.footerQuickLinks ?? [];
  const socialLinks = siteSettings.socialLinks ?? [];

  return (
    <footer className="bg-gray-900 text-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <AppImage
              image={siteSettings.logo}
              alt={siteName || 'Logo'}
              width={160}
              height={48}
              fallbackType="logo"
              className="mb-4"
              sanityWidth={160}
              sanityHeight={48}
            />
            {siteName && <p className="font-semibold text-lg">{siteName}</p>}
            {tagline && <p className="text-gray-400 text-sm mt-1">{tagline}</p>}
            {siteSettings.contactEmail && (
              <a
                href={`mailto:${siteSettings.contactEmail}`}
                className="text-gray-400 hover:text-white text-sm mt-2 block"
              >
                {siteSettings.contactEmail}
              </a>
            )}
          </div>
          {navLinks.length > 0 && (
            <div>
              <h4 className="font-semibold mb-4">Navigation</h4>
              <ul className="space-y-2">
                {navLinks.map((link, i) => {
                  const mapped = mapFooterLink(link, locale);
                  return (
                    <li key={i}>
                      <Link
                        href={mapped.href}
                        className="text-gray-400 hover:text-white transition"
                      >
                        {mapped.label || mapped.href}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
          {footerLinks.length > 0 && (
            <div>
              <h4 className="font-semibold mb-4">Quick links</h4>
              <ul className="space-y-2">
                {footerLinks.map((link, i) => {
                  const mapped = mapFooterLink(link, locale);
                  return (
                    <li key={i}>
                      <Link
                        href={mapped.href}
                        className="text-gray-400 hover:text-white transition"
                      >
                        {mapped.label || mapped.href}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
          {socialLinks.length > 0 && (
            <div>
              <h4 className="font-semibold mb-4">Follow us</h4>
              <ul className="flex gap-4">
                {socialLinks.map((link, i) => (
                  <li key={i}>
                    <a
                      href={link.url ?? '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-white transition"
                    >
                      {link.platform ?? 'Link'}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        {copyrightText && (
          <p className="mt-12 pt-8 border-t border-gray-800 text-gray-500 text-sm text-center">
            {copyrightText}
          </p>
        )}
      </div>
    </footer>
  );
}
