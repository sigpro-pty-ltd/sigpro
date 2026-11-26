import { ArrowRight, Check } from 'lucide-react';
import { useEffect, useState } from 'react';
import { PACKAGING_SERVICES } from '../data/services';
import { ProductImage } from './ProductImage';

interface ServicesViewProps {
  initialServiceId?: string;
  onRequestQuoteForService: (serviceId: string) => void;
  onInspectImage: (src: string, alt: string, title: string) => void;
}

export function ServicesView({
  initialServiceId,
  onRequestQuoteForService,
  onInspectImage,
}: ServicesViewProps) {
  const [selectedFilter, setSelectedFilter] = useState<string>(initialServiceId ?? 'all');

  useEffect(() => {
    if (initialServiceId) {
      setSelectedFilter(initialServiceId);
    }
  }, [initialServiceId]);

  const visibleServices =
    selectedFilter === 'all'
      ? PACKAGING_SERVICES
      : PACKAGING_SERVICES.filter((item) => item.id === selectedFilter);

  return (
    <div className="bg-slate-50 min-h-[calc(100vh-4rem)]">
      {/* Services Page Header */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="max-w-3xl space-y-4">
            <p className="text-xs font-medium text-blue-900">Packaging Services &amp; Products</p>
            <h1 className="text-3xl sm:text-4xl font-display font-bold tracking-tight text-slate-950 [text-wrap:balance]">
              Industrial &amp; Commercial Packaging Supply Range
            </h1>
            <p className="text-base text-slate-600 leading-relaxed">
              Browse our five core packaging product lines supplied from Sandton, Gauteng. Select a
              category below to inspect detailed technical descriptions, common roll and bag
              dimensions, and application suitability.
            </p>
          </div>

          {/* Interactive Filter Controls */}
          <div
            role="tablist"
            aria-label="Filter packaging services"
            className="mt-8 flex flex-wrap items-center gap-2"
          >
            <button
              type="button"
              role="tab"
              aria-selected={selectedFilter === 'all'}
              onClick={() => setSelectedFilter('all')}
              className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 min-h-[40px] cursor-pointer ${
                selectedFilter === 'all'
                  ? 'bg-blue-900 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-950'
              }`}
            >
              All Divisions ({PACKAGING_SERVICES.length})
            </button>

            {PACKAGING_SERVICES.map((service) => {
              const isSelected = selectedFilter === service.id;
              return (
                <button
                  key={service.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setSelectedFilter(service.id)}
                  className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 min-h-[40px] cursor-pointer ${
                    isSelected
                      ? 'bg-blue-900 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-950'
                  }`}
                >
                  {service.index}. {service.shortName}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Detailed Service Sections */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 space-y-12">
        {visibleServices.map((service, idx) => {
          const isImageRight = idx % 2 === 1;
          return (
            <article
              key={service.id}
              id={service.id}
              className="bg-white border border-slate-200 rounded-lg p-6 sm:p-8 lg:p-10"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                {/* Product Studio Photo + Original Spec Sheet Zoom */}
                <div
                  className={`lg:col-span-5 space-y-3 ${
                    isImageRight ? 'lg:order-2' : 'lg:order-1'
                  }`}
                >
                  <ProductImage
                    src={service.studioImage}
                    alt={service.studioImageAlt}
                    title={service.name}
                    fit="cover"
                    zoomLabel="Inspect Spec Sheet"
                    className="aspect-[4/3]"
                    onZoom={() => onInspectImage(service.image, service.imageAlt, service.name)}
                  />
                  <p className="text-xs text-slate-500">
                    Click &ldquo;Inspect Spec Sheet&rdquo; to view the original product reference sheet.
                  </p>
                </div>

                {/* Detailed Service Copy & Specification Table */}
                <div
                  className={`lg:col-span-7 space-y-6 ${
                    isImageRight ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  <div className="space-y-2 pb-5 border-b border-slate-200">
                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                      <span className="font-mono font-medium text-blue-900">{service.index}</span>
                      <span aria-hidden="true">·</span>
                      <span>{service.subtitle}</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-display font-bold tracking-tight text-slate-950">
                      {service.name}
                    </h2>
                  </div>

                  <div className="space-y-3 text-sm sm:text-base text-slate-600 leading-relaxed">
                    {service.detailedDescription.map((paragraph, pIdx) => (
                      <p key={pIdx}>{paragraph}</p>
                    ))}
                  </div>

                  {/* Product Formats & Industry Applications */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                    <div className="space-y-2.5">
                      <h3 className="text-xs font-display font-semibold uppercase tracking-wider text-slate-500">
                        Available Formats
                      </h3>
                      <ul className="space-y-1.5">
                        {service.productTypes.map((type) => (
                          <li key={type} className="flex items-start gap-2 text-sm text-slate-800">
                            <Check className="w-4 h-4 text-blue-900 mt-0.5 shrink-0" />
                            <span>{type}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-2.5">
                      <h3 className="text-xs font-display font-semibold uppercase tracking-wider text-slate-500">
                        Key Applications
                      </h3>
                      <ul className="space-y-1.5">
                        {service.applications.map((app) => (
                          <li key={app} className="flex items-start gap-2 text-sm text-slate-700">
                            <span
                              aria-hidden="true"
                              className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-2 shrink-0"
                            />
                            <span>{app}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Specification Table */}
                  <div className="pt-2">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                      <h3 className="text-xs font-display font-semibold uppercase tracking-wider text-slate-500">
                        Technical Specifications
                      </h3>
                      <span className="text-xs text-slate-500">{service.pricingBasis}</span>
                    </div>

                    <div className="border border-slate-200 rounded-md overflow-hidden">
                      <table className="w-full text-left border-collapse text-sm">
                        <tbody className="divide-y divide-slate-200">
                          {service.specifications.map((spec) => (
                            <tr key={spec.label} className="bg-white hover:bg-slate-50/70">
                              <th
                                scope="row"
                                className="py-2.5 px-4 font-medium text-slate-700 w-1/3"
                              >
                                {spec.label}
                              </th>
                              <td className="py-2.5 px-4 font-mono text-xs sm:text-sm text-slate-950 tabular-nums">
                                {spec.value}
                              </td>
                              <td className="py-2.5 px-4 text-xs text-slate-500 hidden sm:table-cell">
                                {spec.notes}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="pt-3 flex flex-wrap items-center justify-between gap-4">
                    <span className="text-xs text-slate-500">Material: {service.material}</span>
                    <button
                      type="button"
                      onClick={() => onRequestQuoteForService(service.id)}
                      className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-blue-900 hover:bg-blue-950 rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 min-h-[42px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-900 cursor-pointer"
                    >
                      <span>Request Quote for {service.shortName}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </section>
    </div>
  );
}
