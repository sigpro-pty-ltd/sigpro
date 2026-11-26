import { ArrowRight } from 'lucide-react';
import { PACKAGING_SERVICES } from '../data/services';
import type { PageRoute } from './Navbar';

interface SpecificationsViewProps {
  onNavigate: (page: PageRoute, serviceId?: string) => void;
  onRequestQuoteForService: (serviceId: string) => void;
}

export function SpecificationsView({
  onNavigate,
  onRequestQuoteForService,
}: SpecificationsViewProps) {
  return (
    <div className="bg-slate-50 min-h-[calc(100vh-4rem)]">
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="max-w-3xl space-y-4">
            <p className="text-xs font-medium text-blue-900">Procurement Reference</p>
            <h1 className="text-3xl sm:text-4xl font-display font-bold tracking-tight text-slate-950 [text-wrap:balance]">
              Consolidated Packaging Size &amp; Micron Matrix
            </h1>
            <p className="text-base text-slate-600 leading-relaxed">
              Quick-reference sizing, film thickness, roll weight, and material grade summary
              across all five SIG PRO (PTY) LTD product divisions. Custom dimensions and micron
              gauges from 20mic to 150mic are available upon inquiry.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        {PACKAGING_SERVICES.map((service) => (
          <div
            key={service.id}
            className="bg-white border border-slate-200 rounded-lg overflow-hidden"
          >
            <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-display font-bold text-slate-950">
                  {service.index}. {service.name}
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  {service.material} · {service.pricingBasis}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => onNavigate('services', service.id)}
                  className="text-xs font-medium text-slate-700 hover:text-slate-950 underline underline-offset-4 whitespace-nowrap shrink-0 cursor-pointer"
                >
                  View Product Sheet
                </button>
                <button
                  type="button"
                  onClick={() => onRequestQuoteForService(service.id)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-white bg-blue-900 hover:bg-blue-950 rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <span>Quote {service.shortName}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="border-b border-slate-200 text-xs text-slate-500 bg-white">
                    <th scope="col" className="py-3 px-6 font-medium">
                      Specification Item
                    </th>
                    <th scope="col" className="py-3 px-6 font-medium">
                      Dimensions / Gauge
                    </th>
                    <th scope="col" className="py-3 px-6 font-medium">
                      Notes &amp; Application
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {service.specifications.map((spec) => (
                    <tr key={spec.label} className="hover:bg-slate-50/70">
                      <td className="py-3 px-6 font-medium text-slate-800">{spec.label}</td>
                      <td className="py-3 px-6 font-mono text-xs sm:text-sm text-slate-950 tabular-nums">
                        {spec.value}
                      </td>
                      <td className="py-3 px-6 text-slate-600">{spec.notes ?? '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}

        <div className="bg-white border border-slate-200 rounded-lg p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-1.5 max-w-2xl">
            <h2 className="text-lg font-display font-bold text-slate-950">
              Contact Me for Any Packaging Items or Requirements
            </h2>
            <p className="text-sm text-slate-600">
              Looking for a specific bag dimension, custom micron thickness, or packaging supply not
              listed above? Get in touch with our Sandton desk for tailored pricing.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('contact')}
            className="inline-flex items-center gap-2 px-5 py-3 text-sm font-medium text-white bg-blue-900 hover:bg-blue-950 rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 min-h-[44px] cursor-pointer"
          >
            <span>Contact Us</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
}
