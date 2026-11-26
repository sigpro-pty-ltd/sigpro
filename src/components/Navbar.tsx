import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { COMPANY_INFO } from '../data/services';

export type PageRoute = 'home' | 'services' | 'specifications' | 'contact';

interface NavbarProps {
  currentPage: PageRoute;
  onNavigate: (page: PageRoute) => void;
}

const NAV_ITEMS: { id: PageRoute; label: string }[] = [
  { id: 'home', label: 'Overview' },
  { id: 'services', label: 'Services' },
  { id: 'specifications', label: 'Specifications' },
  { id: 'contact', label: 'Contact' },
];

export function Navbar({ currentPage, onNavigate }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (page: PageRoute) => {
    setMobileMenuOpen(false);
    onNavigate(page);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <button
          type="button"
          onClick={() => handleNavClick('home')}
          className="text-xl sm:text-2xl font-display font-bold tracking-tight text-slate-950 hover:text-blue-900 transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-900 cursor-pointer"
        >
          {COMPANY_INFO.name}
        </button>

        {/* Zone 2: Concise single-line navigation links */}
        <nav
          aria-label="Primary Navigation"
          className="hidden md:flex items-center gap-7 text-sm font-medium"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item.id)}
                aria-current={isActive ? 'page' : undefined}
                className={`relative py-1 whitespace-nowrap shrink-0 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-900 cursor-pointer ${
                  isActive
                    ? 'text-blue-900 font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {item.label}
                {isActive && (
                  <span
                    aria-hidden="true"
                    className="absolute left-0 right-0 -bottom-[21px] h-0.5 bg-blue-900"
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Single primary CTA + mobile menu toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => handleNavClick('contact')}
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-900 hover:bg-blue-950 rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 min-h-[40px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-900 cursor-pointer"
          >
            Request Quote
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-md text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-blue-900 cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 py-4 space-y-1">
          <nav aria-label="Mobile Navigation" className="flex flex-col space-y-1">
            {NAV_ITEMS.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavClick(item.id)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`w-full text-left px-3 py-3 text-base font-medium rounded-md transition-colors duration-150 min-h-[44px] cursor-pointer ${
                    isActive
                      ? 'bg-slate-100 text-blue-900 font-semibold'
                      : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>
          <div className="pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={() => handleNavClick('contact')}
              className="w-full py-3 px-4 text-center text-sm font-medium text-white bg-blue-900 hover:bg-blue-950 rounded-md transition-colors duration-150 min-h-[44px] cursor-pointer"
            >
              Request Quote
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
