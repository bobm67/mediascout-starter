import Image from "next/image";
import Link from "next/link";

const productLinks = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/chat", label: "AI Chat" },
  { href: "/profile", label: "Profile" },
];

const companyLinks = [
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const legalLinks = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
];

export function SiteFooter() {
  return (
    <footer className="bg-mediascout-slate border-t border-mediascout-silver/30">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div>
            <div className="flex items-center space-x-2">
              <Image
                src="/logo.png"
                alt="Mediascout"
                width={24}
                height={24}
                className="h-6 w-auto max-h-[24px] object-contain"
              />
              <span className="text-xl font-bold text-mediascout-orange">
                Mediascout
              </span>
            </div>
            <p className="mt-4 text-base text-mediascout-gray">
              AI-powered applications for modern teams.
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-sm font-semibold text-mediascout-silver tracking-wider uppercase">
              Product
            </h3>
            <ul className="mt-4 space-y-4">
              {productLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-base text-mediascout-gray hover:text-mediascout-orange transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-sm font-semibold text-mediascout-silver tracking-wider uppercase">
              Company
            </h3>
            <ul className="mt-4 space-y-4">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-base text-mediascout-gray hover:text-mediascout-orange transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-sm font-semibold text-mediascout-silver tracking-wider uppercase">
              Legal
            </h3>
            <ul className="mt-4 space-y-4">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-base text-mediascout-gray hover:text-mediascout-orange transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t border-mediascout-silver/30 pt-8">
          <p className="text-base text-mediascout-gray text-center">
            &copy; {new Date().getFullYear()} Mediascout. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
