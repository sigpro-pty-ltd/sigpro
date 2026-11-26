import { ArrowRight, Check } from 'lucide-react';
import { useState } from 'react';
import { COMPANY_INFO, PACKAGING_SERVICES } from '../data/services';
import type { PageRoute } from './Navbar';
import { ProductImage } from './ProductImage';

interface HomeViewProps {
  onNavigate: (page: PageRoute, serviceId?: string) => void;
  onInspectImage: (src: string, alt: string, title: string) => void;
}

const SUPPLY_METRICS = [
  {
    figure: '20 – 150 mic',
    label: 'Custom Film Gauges',
    detail: 'Virgin bags & shrink film thickness range',
  },
  {
    figure: '± 40 kg',
    label: 'Recycled LDPE Tubing',
    detail: 'Opens to 1850mm furniture wrap rolls',
  },
  {
    figure: '400m – 2000m',
    label: 'LLDPE Stretch Lengths',
    detail: 'Extended core, normal core & machine rolls',
  },
  {
    figure: 'Sandton, GP',
    label: 'Regional Distribution',
    detail: 'Direct commercial & industrial fulfillment',
  },
];

export function HomeView({ onNavigate, onInspectImage }: HomeViewProps) {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const featuredService = PACKAGING_SERVICES[activeSlideIndex];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
            {/* Hero Copy */}
            <div className="lg:col-span-6 flex flex-col justify-between space-y-8">
              <div className="space-y-4">
                <p className="text-2xl sm:text-4xl font-display font-bold tracking-tight text-blue-900 uppercase">
                  {COMPANY_INFO.name}
                </p>

                <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-600">
                  <span>{COMPANY_INFO.location}</span>
                  <span aria-hidden="true">·</span>
                  <span>Commercial &amp; Industrial Packaging</span>
                </div>

                <h1 className="text-[clamp(2.25rem,4vw,3.5rem)] font-display font-bold tracking-tight text-slate-950 leading-[1.08] [text-wrap:balance]">
                  Dependable Packaging Supplies Built for Commercial Transit and Storage
                </h1>

                <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
                  {COMPANY_INFO.name} supplies food-grade clear virgin bags, brown recycled LDPE
                  furniture tubing, adhesive security and barrier tapes, heat-shrink film, and LLDPE
                  pallet wrap directly from Sandton, Gauteng. Contact me for any packaging items or
                  requirements.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => onNavigate('services')}
                  className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-white bg-blue-900 hover:bg-blue-950 rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 min-h-[44px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-900 cursor-pointer"
                >
                  <span>Explore Packaging Services</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => onNavigate('contact')}
                  className="inline-flex items-center px-5 py-3 text-sm font-medium text-slate-700 hover:text-slate-950 bg-slate-100 hover:bg-slate-200/80 rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 min-h-[44px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-900 cursor-pointer"
                >
                  Contact Sales Team
                </button>
              </div>
            </div>

            {/* Hero Visual Carrier: Interactive Product Sheet Showcase */}
            <div className="lg:col-span-6 flex flex-col justify-between bg-slate-50 border border-slate-200 rounded-lg p-5 sm:p-6">
              <div className="flex items-center justify-between gap-4 pb-4 border-b border-slate-200">
                <div className="min-w-0">
                  <p className="text-xs font-medium text-slate-500">
                    {featuredService.index}. Product Line Preview
                  </p>
                  <h2 className="text-base font-display font-semibold text-slate-900 truncate">
                    {featuredService.name}
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => onNavigate('services', featuredService.id)}
                  className="text-xs font-medium text-blue-900 hover:text-blue-950 underline underline-offset-4 whitespace-nowrap shrink-0 cursor-pointer"
                >
                  Full Specifications
                </button>
              </div>

              <div className="my-4 flex-1 flex items-center">
                <ProductImage
                  src={featuredService.studioImage}
                  alt={featuredService.studioImageAlt}
                  title={featuredService.name}
                  fit="cover"
                  zoomLabel="Enlarge Photo"
                  className="w-full aspect-[4/3]"
                  onZoom={() =>
                    onInspectImage(
                      featuredService.studioImage,
                      featuredService.studioImageAlt,
                      featuredService.name
                    )
                  }
                />
              </div>

              <div className="flex flex-wrap gap-1.5 pt-2">
                {PACKAGING_SERVICES.map((service, idx) => {
                  const selected = idx === activeSlideIndex;
                  return (
                    <button
                      key={service.id}
                      type="button"
                      onClick={() => setActiveSlideIndex(idx)}
                      className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 min-h-[34px] cursor-pointer ${
                        selected
                          ? 'bg-slate-900 text-white'
                          : 'bg-white text-slate-600 border border-slate-200 hover:text-slate-900 hover:border-slate-300'
                      }`}
                    >
                      {service.shortName}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Full-width 4-Column Capabilities Strip */}
          <div className="mt-12 pt-10 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {SUPPLY_METRICS.map((metric) => (
              <div key={metric.label} className="space-y-1">
                <p className="text-xl sm:text-2xl font-display font-bold text-slate-950 tabular-nums">
                  {metric.figure}
                </p>
                <p className="text-sm font-semibold text-slate-800">{metric.label}</p>
                <p className="text-xs text-slate-500 leading-relaxed">{metric.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Packaging Divisions — Asymmetric Bento Grid */}
      <section className="py-16 lg:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="space-y-3 max-w-2xl">
              <p className="text-xs font-medium text-blue-900">Packaging Portfolio</p>
              <h2 className="text-2xl sm:text-3xl font-display font-bold tracking-tight text-slate-950 [text-wrap:balance]">
                Five Specialized Product Lines for Warehousing, Cold Chain &amp; Dispatch
              </h2>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('services')}
              className="inline-flex items-center gap-2 text-sm font-semibold text-blue-900 hover:text-blue-950 underline underline-offset-4 whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>View Complete Services Catalog</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PACKAGING_SERVICES.map((service, index) => {
              const isFeaturedSpan = index === 0 || index === 4;
              return (
                <article
                  key={service.id}
                  className={`bg-white border border-slate-200 rounded-lg p-6 flex flex-col justify-between gap-6 transition-colors duration-150 hover:border-slate-300 ${
                    isFeaturedSpan ? 'lg:col-span-2' : 'lg:col-span-1'
                  }`}
                >
                  <div
                    className={`grid gap-6 ${
                      isFeaturedSpan ? 'grid-cols-1 sm:grid-cols-12 items-center' : 'grid-cols-1'
                    }`}
                  >
                    <div className={isFeaturedSpan ? 'sm:col-span-5' : ''}>
                      <ProductImage
                        src={service.studioImage}
                        alt={service.studioImageAlt}
                        title={service.name}
                        fit="cover"
                        className="aspect-[4/3]"
                      />
                    </div>

                    <div className={`space-y-3 ${isFeaturedSpan ? 'sm:col-span-7' : ''}`}>
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <span className="font-mono font-medium text-blue-900">{service.index}</span>
                        <span aria-hidden="true">·</span>
                        <span className="truncate">{service.pricingBasis}</span>
                      </div>

                      <h3 className="text-lg sm:text-xl font-display font-bold text-slate-950">
                        {service.index}. {service.name}
                      </h3>

                      <p className="text-sm text-slate-600 leading-relaxed">{service.summary}</p>

                      <ul className="pt-1 space-y-1.5">
                        {service.productTypes.slice(0, 4).map((type) => (
                          <li key={type} className="flex items-center gap-2 text-xs text-slate-700">
                            <Check className="w-3.5 h-3.5 text-blue-900 shrink-0" />
                            <span>{type}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
                    <span className="text-xs text-slate-500 truncate">{service.material}</span>
                    <button
                      type="button"
                      onClick={() => onNavigate('services', service.id)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-900 hover:text-blue-950 whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      <span>View Details</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Supply Standards & Direct Conversion */}
      <section className="py-16 lg:py-20 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-7 space-y-4">
              <p className="text-xs font-medium text-blue-900">Why Businesses Partner With Sig Pro</p>
              <h2 className="text-2xl sm:text-3xl font-display font-bold tracking-tight text-slate-950 [text-wrap:balance]">
                Consistent Material Specs &amp; Responsive Gauteng Fulfillment
              </h2>
              <p className="text-base text-slate-600 leading-relaxed max-w-2xl">
                Whether your operation requires food-safe virgin polyethylene bags, high-recovery
                stretch film for automated pallet lines, or custom-printed barrier and security
                tapes, Sig Pro (Pty) LTD pairs clear technical specifications with direct Sandton
                account support.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                <div className="space-y-1.5">
                  <h3 className="text-sm font-display font-semibold text-slate-900">
                    Exact Micron &amp; Roll Tolerances
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Every line is supplied to clear width, length, and micron specifications from
                    11mic stretch wrap to 100mic heavy-duty tubing.
                  </p>
                </div>
                <div className="space-y-1.5">
                  <h3 className="text-sm font-display font-semibold text-slate-900">
                    Bulk &amp; Custom Print Capability
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Standard stock sizes ship fast, with custom shrink widths up to 1400mm and
                    custom-printed security or cable barrier tapes available to order.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-slate-900 text-white rounded-lg p-7 sm:p-8 space-y-6">
              <div className="space-y-2">
                <p className="text-xs font-medium text-blue-200">Direct Procurement Desk</p>
                <h3 className="text-xl font-display font-bold tracking-tight">
                  Contact Me for Any Packaging Items or Requirements
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Reach our Sandton office directly by email or phone for standard stock, bulk roll
                  pricing, or custom packaging specifications.
                </p>
              </div>

              <div className="space-y-2 text-sm border-t border-slate-800 pt-5">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-slate-400">Email</span>
                  <a
                    href={`mailto:${COMPANY_INFO.email}`}
                    className="font-medium text-white hover:underline"
                  >
                    {COMPANY_INFO.email}
                  </a>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-slate-400">Phone</span>
                  <a
                    href={`tel:${COMPANY_INFO.phoneRaw}`}
                    className="font-medium text-white hover:underline tabular-nums"
                  >
                    {COMPANY_INFO.phoneDisplay}
                  </a>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-slate-400">Location</span>
                  <span className="font-medium text-white">{COMPANY_INFO.location}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onNavigate('contact')}
                className="w-full py-3 px-5 text-sm font-semibold text-slate-950 bg-white hover:bg-slate-100 rounded-md transition-colors duration-150 min-h-[44px] cursor-pointer"
              >
                Open Quote &amp; Contact Form
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
