export interface SpecRow {
  label: string;
  value: string;
  notes?: string;
}

export interface ServiceItem {
  id: string;
  index: string;
  name: string;
  shortName: string;
  subtitle: string;
  image: string;
  imageAlt: string;
  studioImage: string;
  studioImageAlt: string;
  summary: string;
  detailedDescription: string[];
  material: string;
  pricingBasis: string;
  productTypes: string[];
  specifications: SpecRow[];
  applications: string[];
}

export const COMPANY_INFO = {
  name: 'SIG PRO (PTY) LTD',
  shortBrand: 'SIG PRO',
  email: 'sigprojk@gmail.com',
  phoneRaw: '+27849654855',
  phoneDisplay: '+27 84 965 4855',
  location: 'Sandton, Gauteng, South Africa',
  hours: 'Monday – Friday, 08:00 – 17:00 SAST',
} as const;

export const PACKAGING_SERVICES: ServiceItem[] = [
  {
    id: 'clear-virgin-bags',
    index: '01',
    name: 'Clear Virgin Bags',
    shortName: 'Virgin Bags',
    subtitle: 'Food-Grade & Commercial Polyethylene Liners',
    image: '/assets/aistudio/Clear_virign_bags_059881f2.jpg',
    imageAlt: 'Sig Pro Clear Virgin Bags specification sheet showing butcher bags, crate liners, and ice bags',
    studioImage: '/src/assets/images/studio_virgin_bags_1795693090226.jpg',
    studioImageAlt: 'Studio photograph of clear virgin polyethylene bags, blue crate liner, and tied ice bags',
    summary:
      'High-clarity virgin polymer bags and heavy-duty liners ranging from 20 to 150 micron for food processing, cold storage, and retail packaging.',
    detailedDescription: [
      'Manufactured from uncontaminated virgin polyethylene resin, our Clear Virgin Bags provide high optical clarity, consistent seal integrity, and dependable puncture resistance across wet, frozen, and dry goods handling.',
      'Available across five core formats—Butcher Bags, Ice Bags, Bucket Liners, T-Shirt Bags, and Crate Liners—with customizable micron gauges from 20mic for lightweight retail packing up to 150mic for demanding industrial and abattoir use.',
    ],
    material: '100% Virgin Polyethylene (LDPE / HDPE options)',
    pricingBasis: 'Supplied in standard packs & bulk bales (20mic – 150mic)',
    productTypes: [
      'Butcher Bags',
      'Ice Bags',
      'Bucket Liners',
      'T-Shirt Bags',
      'Crate Liners',
    ],
    specifications: [
      { label: 'Micron Range', value: '20mic – 150mic', notes: 'Custom gauge on order' },
      { label: 'Small Format', value: '(W) 200 × (L) 300 mm', notes: 'Portion & ice packing' },
      { label: 'Medium Standard', value: '(W) 300 × (L) 400 mm', notes: 'Retail & food prep' },
      { label: 'Medium Deep', value: '(W) 300 × (L) 450 mm', notes: 'Butchery & cold chain' },
      { label: 'Large Format', value: '(W) 450 × (L) 600 mm', notes: 'Bucket & bulk bagging' },
      { label: 'Heavy Crate Liner', value: '(W) 600 × (L) 900 × 50mic', notes: 'Industrial crates & bins' },
    ],
    applications: [
      'Abattoirs, butcheries, and meat processing',
      'Commercial ice manufacturing and hospitality',
      'Food-grade bucket and crate lining',
      'Retail carry and wholesale counter packing',
    ],
  },
  {
    id: 'smokey-tubing',
    index: '02',
    name: 'Smokey Tubing (Furniture Wrap)',
    shortName: 'Smokey Tubing',
    subtitle: 'Heavy-Duty Recycled LDPE Transit & Storage Roll',
    image: '/assets/aistudio/Smokey_Tubing_faedd180.jpg',
    imageAlt: 'Sig Pro Smokey Tubing furniture wrap roll specification sheet',
    studioImage: '/src/assets/images/studio_brown_tubing_1795693823348.jpg',
    studioImageAlt: 'Studio photograph of heavy-duty brown recycled LDPE smokey tubing roll',
    summary:
      'Tough 100-micron brown recycled LDPE continuous tubing supplied on ~40 kg rolls to shield furniture and large equipment against moisture, dust, and abrasion.',
    detailedDescription: [
      'Also known across the removals and upholstery trade as furniture wrap, SIG PRO Smokey Tubing is extruded from durable brown recycled Low-Density Polyethylene (LDPE) for cost-effective, high-tear-strength surface protection.',
      'Supplied on continuous industrial rolls that open to a full 1850mm gusseted width, allowing teams to sleeve sofas, mattresses, cabinetry, and palletized assemblies quickly before sealing. Flat sheeting and alternative colours are available upon request.',
    ],
    material: 'Brown Recycled Low-Density Polyethylene (LDPE)',
    pricingBasis: 'Sold per kilogram (± 40 kg standard rolls)',
    productTypes: [
      'Brown Gusseted Smokey Tubing Rolls',
      'Flat Plastic Sheeting (Optional)',
      'Custom Colour Extrusions',
    ],
    specifications: [
      { label: 'Roll Dimensions', value: '(W) 1250 + (G) 600 × 100mic', notes: 'Opens to 1850 mm width' },
      { label: 'Roll Weight', value: '± 40 kg per roll', notes: 'Sold per kilo' },
      { label: 'Film Thickness', value: '100 micron', notes: 'Heavy-duty abrasion barrier' },
      { label: 'Material & Colour', value: 'Brown Recycled LDPE', notes: 'Water & dirt resistant' },
      { label: 'Alternative Formats', value: 'Sheeting & Colours', notes: 'Available on request' },
    ],
    applications: [
      'Furniture manufacturing and showroom dispatch',
      'Domestic and commercial removal companies',
      'Long-term warehouse storage protection',
      'Timber, metal profile, and appliance wrapping',
    ],
  },
  {
    id: 'tapes',
    index: '03',
    name: 'Barrier & Security Tapes',
    shortName: 'Tapes',
    subtitle: 'Adhesive Carton Security & Non-Adhesive Hazard Demarcation',
    image: '/assets/aistudio/tapes_4d3ca490.jpg',
    imageAlt: 'Sig Pro adhesive security tapes and non-adhesive LDPE barrier tapes specification sheet',
    studioImage: '/src/assets/images/studio_industrial_tapes_1795693090641.jpg',
    studioImageAlt: 'Studio photograph of yellow-black barrier tape, red-white barrier tape, and security tape rolls',
    summary:
      'Dual-line industrial tape range covering high-visibility non-adhesive LDPE barrier tapes and tamper-evident printed adhesive packaging tapes.',
    detailedDescription: [
      'Our non-adhesive Barrier Tapes are produced from weather-resistant LDPE polythene in standard 75mm × 500m × 40mic rolls for warehouses, construction zones, sports venues, and public hazard demarcation. Custom-printed barrier runs are available for underground utility identification or event branding.',
      'For dispatch and logistics, our Adhesive Security & Printed Packaging Tapes seal cartons while communicating tamper warnings ("If Seal Is Broken Check Contents Before Accepting"), barcodes, handling instructions, and corporate branding.',
    ],
    material: 'LDPE Polythene (Barrier) & BOPP / Acrylic Adhesive (Security)',
    pricingBasis: 'Supplied by roll or carton quantity; custom print runs available',
    productTypes: [
      'Non-Adhesive Barrier Tape',
      'Custom-Printed Underground Cable Tape',
      'Tamper-Evident Security Tape',
      'Branded & Barcoded Carton Tape',
    ],
    specifications: [
      { label: 'Barrier Tape Size', value: '75 mm × 500 m × 40mic', notes: 'Non-adhesive LDPE roll' },
      { label: 'Barrier Colours', value: 'Red/White · Yellow/Black', notes: 'Plus Blue/White & Green/White' },
      { label: 'Security Print', value: 'Tamper Warning Standard', notes: 'Carton seal verification' },
      { label: 'Custom Options', value: 'Logos, Barcodes & Coding', notes: 'Marketing & cable marking' },
    ],
    applications: [
      'Warehouse aisle & safety hazard demarcation',
      'Civil engineering and underground cable marking',
      'High-value courier and e-commerce carton sealing',
      'Sports fields, events, and crowd guidance',
    ],
  },
  {
    id: 'shrink-film',
    index: '04',
    name: 'Shrink Film',
    shortName: 'Shrink Film',
    subtitle: 'Heat-Activated Polymer Over-Wrap for Multi-Packs & Cartons',
    image: '/assets/aistudio/Shrink_f3ab9094.jpg',
    imageAlt: 'Sig Pro Shrink Film roll specification sheet',
    studioImage: '/src/assets/images/studio_shrink_film_1795693090647.jpg',
    studioImageAlt: 'Studio photograph of translucent white polymer shrink film roll with dark inner core',
    summary:
      'Engineered polymer shrink film priced per kilogram for heat-gun or conveyor tunnel bundling of beverages, cartons, and multipack goods.',
    detailedDescription: [
      'SIG PRO Shrink Film conforms tightly around irregular shapes and multi-unit packs once exposed to controlled heat from a handheld heat gun or an automated heat tunnel conveyor.',
      'Designed to stabilize cartons, beverage trays, canned goods, and boxed merchandise into a single tamper-resistant transit unit, our shrink rolls are manufactured to client specifications up to 1400mm wide and 20 to 150 micron thick.',
    ],
    material: 'Heat-Shrinkable Polymer Film (LDPE)',
    pricingBasis: 'Sold in rolls, priced per kilogram',
    productTypes: [
      '450mm Hand & Tunnel Shrink Rolls',
      '500mm Industrial Shrink Rolls',
      'Custom-Width Shrink Film (up to 1400mm)',
    ],
    specifications: [
      { label: 'Common Roll 1', value: '(W) 450 mm × 50mic', notes: '20 kg standard roll' },
      { label: 'Common Roll 2', value: '(W) 500 mm × 50mic', notes: '20 kg standard roll' },
      { label: 'Custom Widths', value: 'Up to 1400 mm wide', notes: 'Per client specification' },
      { label: 'Thickness Range', value: '20mic – 150mic', notes: 'Light to heavy bundling' },
      { label: 'Application Method', value: 'Heat Gun or Heat Tunnel', notes: 'Manual & automated lines' },
    ],
    applications: [
      'Beverage multipacks and bottling lines',
      'Carton and box over-wrapping',
      'Unitizing mixed retail or hardware items',
      'Dust and moisture protection during distribution',
    ],
  },
  {
    id: 'pallet-wrap',
    index: '05',
    name: 'Pallet Wrap (LLDPE Stretch Film)',
    shortName: 'Pallet Wrap',
    subtitle: 'High-Recovery Hand & Machine Stretch Film Rolls',
    image: '/assets/aistudio/Pallet_Wrap_824db671.jpg',
    imageAlt: 'Sig Pro Pallet Wrap Extended Core, Normal Core, and Machine Roll specification sheet',
    studioImage: '/src/assets/images/studio_pallet_wrap_1795693091483.jpg',
    studioImageAlt: 'Studio photograph of extended-core and normal-core LLDPE stretch pallet wrap rolls',
    summary:
      'High-stretch Linear Low-Density Polyethylene (LLDPE) film with superior elastic recovery in Extended Core, Normal Core, and 2000m Machine Roll formats.',
    detailedDescription: [
      'Manufactured from Linear Low-Density Polyethylene (LLDPE), Sig Pro Pallet Wrap delivers high elongation and consistent elastic memory so stacked cartons remain tightly bound without crushing corners or loosening during long-haul freight.',
      'Available in Extended Core (E/C) rolls with integrated handles for fast manual wrapping, Normal Core (N/C) rolls for handheld dispensers, and 2000-metre Machine Rolls engineered for high-throughput automated pallet wrappers.',
    ],
    material: 'Linear Low-Density Polyethylene (LLDPE)',
    pricingBasis: 'Supplied per roll or full pallet box quantities',
    productTypes: [
      'Extended Core Hand Wrap (With Handles)',
      'Normal Core Hand Wrap (No Handles)',
      'Automated Machine Stretch Rolls',
    ],
    specifications: [
      { label: '400mm Extended Core', value: '(W) 400 × (L) 400 m × 11mic', notes: 'E/C — Built-in handles' },
      { label: '400mm Normal Core', value: '(W) 400 × (L) 400 m × 11mic', notes: 'N/C — Dispenser ready' },
      { label: '450mm Normal Core', value: '(W) 450 × (L) 400 m × 11mic', notes: 'N/C — Standard pallet height' },
      { label: '450mm Heavy Hand', value: '(W) 450 × (L) 400 m × 17mic', notes: 'E/C — High puncture load' },
      { label: 'Machine Roll', value: '(W) 450 × (L) 2000 m × 11mic', notes: 'Automated wrapping lines' },
    ],
    applications: [
      'Warehouse pallet stabilization and unit load containment',
      'Long-haul road freight and logistics hubs',
      'High-volume automated distribution centres',
      'Weather and dust shielding for stacked inventory',
    ],
  },
];
