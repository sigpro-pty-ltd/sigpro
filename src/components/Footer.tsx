import { Mail, MapPin, Phone } from 'lucide-react';
import { COMPANY_INFO, PACKAGING_SERVICES } from '../data/services';
import type { PageRoute } from './Navbar';

interface FooterProps {
  onNavigate: (page: PageRoute, serviceId?: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          <div className="md:col-span-5 space-y-4">
            <p className="text-lg font-display font-bold tracking-tight text-white">
              {COMPANY_INFO.name}
            </p>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Industrial and commercial packaging supplier based in Sandton, Gauteng. Delivering
              consistent virgin and recycled polyethylene films, protective wraps, and security
              tapes across South Africa.
            </p>
          </div>

          <div className="md:col-span-3 space-y-3">
            <h2 className="text-sm font-display font-semibold text-white">Packaging Divisions</h2>
            <ul className="space-y-2 text-sm text-slate-400">
              {PACKAGING_SERVICES.map((service) => (
                <li key={service.id}>
                  <button
                    type="button"
                    onClick={() => onNavigate('services', service.id)}
                    className="hover:text-white transition-colors duration-150 text-left cursor-pointer"
                  >
                    {service.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4 space-y-3">
            <h2 className="text-sm font-display font-semibold text-white">Direct Contact</h2>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-slate-500 mt-0.5 shrink-0" />
                <span>{COMPANY_INFO.location}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-slate-500 shrink-0" />
                <a
                  href={`tel:${COMPANY_INFO.phoneRaw}`}
                  className="hover:text-white transition-colors duration-150 tabular-nums"
                >
                  {COMPANY_INFO.phoneDisplay}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-slate-500 shrink-0" />
                <a
                  href={`mailto:${COMPANY_INFO.email}`}
                  className="hover:text-white transition-colors duration-150"
                >
                  {COMPANY_INFO.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © {currentYear} {COMPANY_INFO.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={() => onNavigate('home')}
              className="hover:text-slate-300 transition-colors duration-150 cursor-pointer"
            >
              Overview
            </button>
            <button
              type="button"
              onClick={() => onNavigate('services')}
              className="hover:text-slate-300 transition-colors duration-150 cursor-pointer"
            >
              Services
            </button>
            <button
              type="button"
              onClick={() => onNavigate('specifications')}
              className="hover:text-slate-300 transition-colors duration-150 cursor-pointer"
            >
              Specifications
            </button>
            <button
              type="button"
              onClick={() => onNavigate('contact')}
              className="hover:text-slate-300 transition-colors duration-150 cursor-pointer"
            >
              Contact
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
