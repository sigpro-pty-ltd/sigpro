/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { ContactView } from './components/ContactView';
import { Footer } from './components/Footer';
import { HomeView } from './components/HomeView';
import { LightboxModal } from './components/LightboxModal';
import { Navbar, type PageRoute } from './components/Navbar';
import { ServicesView } from './components/ServicesView';
import { SpecificationsView } from './components/SpecificationsView';

interface LightboxState {
  src: string;
  alt: string;
  title: string;
}

function getInitialRoute(): PageRoute {
  const hash = window.location.hash.replace('#', '').toLowerCase();
  if (hash === 'services' || hash === 'specifications' || hash === 'contact') {
    return hash;
  }
  return 'home';
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageRoute>(getInitialRoute);
  const [selectedServiceId, setSelectedServiceId] = useState<string | undefined>(undefined);
  const [quoteServiceId, setQuoteServiceId] = useState<string | undefined>(undefined);
  const [lightbox, setLightbox] = useState<LightboxState | null>(null);

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentPage(getInitialRoute());
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (page: PageRoute, serviceId?: string) => {
    setCurrentPage(page);
    if (page === 'services') {
      setSelectedServiceId(serviceId ?? 'all');
    } else if (page !== 'contact') {
      setQuoteServiceId(undefined);
    }

    const nextHash = page === 'home' ? '#overview' : `#${page}`;
    if (window.location.hash !== nextHash) {
      window.history.pushState(null, '', nextHash);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRequestQuoteForService = (serviceId: string) => {
    setQuoteServiceId(serviceId);
    setCurrentPage('contact');
    if (window.location.hash !== '#contact') {
      window.history.pushState(null, '', '#contact');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleInspectImage = (src: string, alt: string, title: string) => {
    setLightbox({ src, alt, title });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Navbar currentPage={currentPage} onNavigate={handleNavigate} />

      <main className="flex-1">
        {currentPage === 'home' && (
          <HomeView onNavigate={handleNavigate} onInspectImage={handleInspectImage} />
        )}
        {currentPage === 'services' && (
          <ServicesView
            initialServiceId={selectedServiceId}
            onRequestQuoteForService={handleRequestQuoteForService}
            onInspectImage={handleInspectImage}
          />
        )}
        {currentPage === 'specifications' && (
          <SpecificationsView
            onNavigate={handleNavigate}
            onRequestQuoteForService={handleRequestQuoteForService}
          />
        )}
        {currentPage === 'contact' && <ContactView preselectedServiceId={quoteServiceId} />}
      </main>

      <Footer onNavigate={handleNavigate} />

      {lightbox && (
        <LightboxModal
          src={lightbox.src}
          alt={lightbox.alt}
          title={lightbox.title}
          onClose={() => setLightbox(null)}
        />
      )}
    </div>
  );
}
