import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="border-t border-[#FECDD3] bg-white pt-12 pb-8">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-8 md:grid-cols-4 lg:grid-cols-5">
          {/* Brand & Intro */}
          <div className="md:col-span-2 lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#B91C1C]">
                <span className="text-sm font-bold text-white">K</span>
              </div>
              <span className="font-serif text-xl font-bold text-[#1C1917]">Kshtriya Matrimony</span>
            </Link>
            <p className="text-sm text-[#6B7280] max-w-xs leading-relaxed">
              A calm, family-first matrimony service. Every profile is ID-verified, making trust the foundation of your journey.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-[#9CA3AF]">Company</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-sm text-[#1C1917] transition hover:text-[#B91C1C]">About Us</Link></li>
              <li><Link to="/contact" className="text-sm text-[#1C1917] transition hover:text-[#B91C1C]">Contact</Link></li>
              <li><Link to="/pricing" className="text-sm text-[#1C1917] transition hover:text-[#B91C1C]">Pricing</Link></li>
              <li><Link to="/success-stories" className="text-sm text-[#1C1917] transition hover:text-[#B91C1C]">Success Stories</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-[#9CA3AF]">Legal</h3>
            <ul className="space-y-2">
              <li><Link to="/terms" className="text-sm text-[#1C1917] transition hover:text-[#B91C1C]">Terms of Service</Link></li>
              <li><Link to="/privacy" className="text-sm text-[#1C1917] transition hover:text-[#B91C1C]">Privacy Policy</Link></li>
              <li><Link to="/guidelines" className="text-sm text-[#1C1917] transition hover:text-[#B91C1C]">Community Guidelines</Link></li>
            </ul>
          </div>

          {/* Social / Contact */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-[#9CA3AF]">Connect</h3>
            <ul className="space-y-2">
              <li><a href="mailto:hello@kshtriya.com" className="text-sm text-[#1C1917] transition hover:text-[#B91C1C]">hello@kshtriya.com</a></li>
              <li><a href="#" className="text-sm text-[#1C1917] transition hover:text-[#B91C1C]">Instagram</a></li>
              <li><a href="#" className="text-sm text-[#1C1917] transition hover:text-[#B91C1C]">Facebook</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 flex flex-col items-center justify-between border-t border-[#FECDD3] pt-8 sm:flex-row">
          <p className="text-xs text-[#9CA3AF]">
            © {new Date().getFullYear()} Kshtriya Matrimony. All rights reserved.
          </p>
          <div className="mt-4 flex gap-4 sm:mt-0">
            <p className="text-xs text-[#9CA3AF]">Made with ❤️ in India</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
