import { AlertCircle, CheckCircle2, Clock, Copy, Mail, MapPin, Phone, Send } from 'lucide-react';
import { type FormEvent, useEffect, useState } from 'react';
import { COMPANY_INFO, PACKAGING_SERVICES } from '../data/services';

interface ContactViewProps {
  preselectedServiceId?: string;
}

interface InquiryRecord {
  reference: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  productLine: string;
  quantity: string;
  message: string;
  submittedAt: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

const STORAGE_KEY = 'sigpro_inquiries_v1';

export function ContactView({ preselectedServiceId }: ContactViewProps) {
  const defaultProduct =
    PACKAGING_SERVICES.find((s) => s.id === preselectedServiceId)?.name ??
    'General Packaging Inquiry';

  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [productLine, setProductLine] = useState(defaultProduct);
  const [quantity, setQuantity] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [submittedRecord, setSubmittedRecord] = useState<InquiryRecord | null>(null);
  const [copiedField, setCopiedField] = useState<'email' | 'phone' | null>(null);

  useEffect(() => {
    if (preselectedServiceId) {
      const matched = PACKAGING_SERVICES.find((s) => s.id === preselectedServiceId);
      if (matched) {
        setProductLine(matched.name);
        setSubmittedRecord(null);
      }
    }
  }, [preselectedServiceId]);

  const validate = (): FormErrors => {
    const nextErrors: FormErrors = {};
    if (!name.trim() || name.trim().length < 2) {
      nextErrors.name = 'Please enter your full name.';
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailPattern.test(email.trim())) {
      nextErrors.email = 'Please enter a valid email address.';
    }
    const digitsOnly = phone.replace(/[\s\-()+]/g, '');
    if (!phone.trim() || digitsOnly.length < 9) {
      nextErrors.phone = 'Please enter a valid contact phone number (at least 9 digits).';
    }
    if (!message.trim() || message.trim().length < 10) {
      nextErrors.message = 'Please provide brief details on your packaging requirements.';
    }
    return nextErrors;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    const reference = `SP-${Math.floor(100000 + Math.random() * 900000)}`;
    const record: InquiryRecord = {
      reference,
      name: name.trim(),
      company: company.trim(),
      email: email.trim(),
      phone: phone.trim(),
      productLine,
      quantity: quantity.trim(),
      message: message.trim(),
      submittedAt: new Date().toLocaleString('en-ZA'),
    };

    try {
      const existingRaw = localStorage.getItem(STORAGE_KEY);
      const existing: InquiryRecord[] = existingRaw ? JSON.parse(existingRaw) : [];
      localStorage.setItem(STORAGE_KEY, JSON.stringify([record, ...existing].slice(0, 10)));
    } catch {
      // Ignore storage quota errors cleanly
    }

    setSubmittedRecord(record);
  };

  const handleReset = () => {
    setName('');
    setCompany('');
    setEmail('');
    setPhone('');
    setQuantity('');
    setMessage('');
    setErrors({});
    setSubmittedRecord(null);
  };

  const handleCopy = async (type: 'email' | 'phone', value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedField(type);
      setTimeout(() => setCopiedField(null), 2000);
    } catch {
      // Clipboard API unavailable in restricted context
    }
  };

  const buildMailtoHref = (record: InquiryRecord) => {
    const subject = encodeURIComponent(
      `[${record.reference}] Packaging Quote Request — ${record.productLine}`
    );
    const body = encodeURIComponent(
      [
        `Reference: ${record.reference}`,
        `Name: ${record.name}`,
        record.company ? `Company: ${record.company}` : null,
        `Email: ${record.email}`,
        `Phone: ${record.phone}`,
        `Product Division: ${record.productLine}`,
        record.quantity ? `Estimated Volume / Spec: ${record.quantity}` : null,
        '',
        'Inquiry Details:',
        record.message,
      ]
        .filter((line): line is string => line !== null)
        .join('\n')
    );
    return `mailto:${COMPANY_INFO.email}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="bg-slate-50 min-h-[calc(100vh-4rem)]">
      {/* Page Header */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="max-w-3xl space-y-4">
            <p className="text-xs font-medium text-blue-900">Contact &amp; Inquiries</p>
            <h1 className="text-3xl sm:text-4xl font-display font-bold tracking-tight text-slate-950 [text-wrap:balance]">
              Speak With {COMPANY_INFO.name} in Sandton, Gauteng
            </h1>
            <p className="text-base text-slate-600 leading-relaxed">
              Contact me for any packaging items or requirements — request pricing per kilogram,
              bulk bale rates, custom micron gauges (20mic – 150mic), or custom-printed tapes. Our
              team responds promptly to commercial and industrial inquiries.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Split */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Contact Information Sidebar */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white border border-slate-200 rounded-lg p-6 sm:p-8 space-y-6">
              <div className="space-y-1.5 pb-4 border-b border-slate-200">
                <h2 className="text-lg font-display font-bold text-slate-950">
                  Company Contact Details
                </h2>
                <p className="text-sm text-slate-600">
                  Direct channels for quotations, orders, and specification queries.
                </p>
              </div>

              <div className="space-y-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-blue-900 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs font-medium text-slate-500">Email Inquiries</p>
                      <a
                        href={`mailto:${COMPANY_INFO.email}`}
                        className="text-base font-semibold text-slate-950 hover:text-blue-900 transition-colors"
                      >
                        {COMPANY_INFO.email}
                      </a>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy('email', COMPANY_INFO.email)}
                    aria-label="Copy email address"
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-950 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors shrink-0 cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{copiedField === 'email' ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>

                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-blue-900 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs font-medium text-slate-500">Telephone &amp; Sales</p>
                      <a
                        href={`tel:${COMPANY_INFO.phoneRaw}`}
                        className="text-base font-semibold text-slate-950 hover:text-blue-900 transition-colors tabular-nums"
                      >
                        {COMPANY_INFO.phoneDisplay}
                      </a>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy('phone', COMPANY_INFO.phoneDisplay)}
                    aria-label="Copy phone number"
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-950 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors shrink-0 cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{copiedField === 'phone' ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-blue-900 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs font-medium text-slate-500">Head Office &amp; Dispatch</p>
                    <p className="text-base font-semibold text-slate-950">
                      {COMPANY_INFO.location}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-blue-900 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs font-medium text-slate-500">Operating Hours</p>
                    <p className="text-sm font-medium text-slate-800">{COMPANY_INFO.hours}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-lg p-6 space-y-2">
              <h3 className="text-sm font-display font-semibold text-slate-950">
                Helpful Details to Include
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                For faster pricing on film and bags, let us know your preferred width (mm), length,
                micron thickness (e.g., 11mic pallet wrap or 50mic shrink rolls), and estimated
                monthly roll or kilogram volume.
              </p>
            </div>
          </div>

          {/* Contact & Quote Form */}
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-lg p-6 sm:p-8">
            {submittedRecord ? (
              <div className="space-y-6 py-4">
                <div className="flex items-start gap-3 text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-md p-4">
                  <CheckCircle2 className="w-5 h-5 text-emerald-700 mt-0.5 shrink-0" />
                  <div className="space-y-1">
                    <p className="text-sm font-semibold">
                      Inquiry Prepared — Reference {submittedRecord.reference}
                    </p>
                    <p className="text-sm text-emerald-900/80">
                      Thank you, {submittedRecord.name}. Your inquiry summary for{' '}
                      <span className="font-medium">{submittedRecord.productLine}</span> is ready.
                      Send it directly via your email client below or call{' '}
                      <span className="tabular-nums font-medium">{COMPANY_INFO.phoneDisplay}</span>.
                    </p>
                  </div>
                </div>

                <div className="border border-slate-200 rounded-md divide-y divide-slate-200 text-sm">
                  <div className="px-4 py-3 flex justify-between gap-4">
                    <span className="text-slate-500">Product Division</span>
                    <span className="font-medium text-slate-950 text-right">
                      {submittedRecord.productLine}
                    </span>
                  </div>
                  <div className="px-4 py-3 flex justify-between gap-4">
                    <span className="text-slate-500">Contact Email</span>
                    <span className="font-medium text-slate-950 text-right">
                      {submittedRecord.email}
                    </span>
                  </div>
                  <div className="px-4 py-3 flex justify-between gap-4">
                    <span className="text-slate-500">Phone Number</span>
                    <span className="font-medium text-slate-950 tabular-nums text-right">
                      {submittedRecord.phone}
                    </span>
                  </div>
                  {submittedRecord.quantity && (
                    <div className="px-4 py-3 flex justify-between gap-4">
                      <span className="text-slate-500">Estimated Volume / Spec</span>
                      <span className="font-medium text-slate-950 text-right">
                        {submittedRecord.quantity}
                      </span>
                    </div>
                  )}
                  <div className="px-4 py-3 space-y-1">
                    <span className="text-slate-500 block">Requirements</span>
                    <p className="text-slate-800 whitespace-pre-line">{submittedRecord.message}</p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <a
                    href={buildMailtoHref(submittedRecord)}
                    className="inline-flex items-center gap-2 px-5 py-3 text-sm font-medium text-white bg-blue-900 hover:bg-blue-950 rounded-md transition-colors duration-150 min-h-[44px]"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send via Email App to {COMPANY_INFO.email}</span>
                  </a>

                  <button
                    type="button"
                    onClick={handleReset}
                    className="inline-flex items-center px-5 py-3 text-sm font-medium text-slate-700 hover:text-slate-950 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors duration-150 min-h-[44px] cursor-pointer"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div className="space-y-1 pb-4 border-b border-slate-200">
                  <h2 className="text-lg font-display font-bold text-slate-950">
                    Request a Packaging Quote
                  </h2>
                  <p className="text-sm text-slate-600">
                    Complete the form below and our Sandton team will prepare your quotation.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label htmlFor="contact-name" className="block text-sm font-medium text-slate-800">
                      Full Name <span className="text-red-700">*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Thabo Mokoena"
                      aria-invalid={Boolean(errors.name)}
                      className={`w-full px-3.5 py-2.5 text-sm bg-white border rounded-md text-slate-950 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 min-h-[44px] ${
                        errors.name ? 'border-red-600' : 'border-slate-300'
                      }`}
                    />
                    {errors.name && (
                      <p className="flex items-center gap-1.5 text-xs text-red-700">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.name}</span>
                      </p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="contact-company"
                      className="block text-sm font-medium text-slate-800"
                    >
                      Company Name
                    </label>
                    <input
                      id="contact-company"
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="e.g. Highveld Logistics (Pty) Ltd"
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-md text-slate-950 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 min-h-[44px]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label
                      htmlFor="contact-email"
                      className="block text-sm font-medium text-slate-800"
                    >
                      Email Address <span className="text-red-700">*</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@company.co.za"
                      aria-invalid={Boolean(errors.email)}
                      className={`w-full px-3.5 py-2.5 text-sm bg-white border rounded-md text-slate-950 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 min-h-[44px] ${
                        errors.email ? 'border-red-600' : 'border-slate-300'
                      }`}
                    />
                    {errors.email && (
                      <p className="flex items-center gap-1.5 text-xs text-red-700">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.email}</span>
                      </p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="contact-phone"
                      className="block text-sm font-medium text-slate-800"
                    >
                      Phone Number <span className="text-red-700">*</span>
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+27 82 000 0000"
                      aria-invalid={Boolean(errors.phone)}
                      className={`w-full px-3.5 py-2.5 text-sm bg-white border rounded-md text-slate-950 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 min-h-[44px] tabular-nums ${
                        errors.phone ? 'border-red-600' : 'border-slate-300'
                      }`}
                    />
                    {errors.phone && (
                      <p className="flex items-center gap-1.5 text-xs text-red-700">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.phone}</span>
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label
                      htmlFor="contact-product"
                      className="block text-sm font-medium text-slate-800"
                    >
                      Packaging Division
                    </label>
                    <select
                      id="contact-product"
                      value={productLine}
                      onChange={(e) => setProductLine(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-md text-slate-950 focus:outline-none focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 min-h-[44px]"
                    >
                      <option value="General Packaging Inquiry">General Packaging Inquiry</option>
                      {PACKAGING_SERVICES.map((service) => (
                        <option key={service.id} value={service.name}>
                          {service.index}. {service.name}
                        </option>
                      ))}
                      <option value="Multiple Product Lines">Multiple Product Lines</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="contact-quantity"
                      className="block text-sm font-medium text-slate-800"
                    >
                      Estimated Volume / Roll Size
                    </label>
                    <input
                      id="contact-quantity"
                      type="text"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      placeholder="e.g. 20 rolls / 500 kg / 450x600mm"
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-md text-slate-950 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 min-h-[44px]"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="contact-message"
                    className="block text-sm font-medium text-slate-800"
                  >
                    Project &amp; Delivery Details <span className="text-red-700">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Specify bag dimensions, micron thickness, core type (E/C or N/C), custom tape printing, or delivery location in Gauteng..."
                    aria-invalid={Boolean(errors.message)}
                    className={`w-full px-3.5 py-2.5 text-sm bg-white border rounded-md text-slate-950 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 ${
                      errors.message ? 'border-red-600' : 'border-slate-300'
                    }`}
                  />
                  {errors.message && (
                    <p className="flex items-center gap-1.5 text-xs text-red-700">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.message}</span>
                    </p>
                  )}
                </div>

                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <p className="text-xs text-slate-500">
                    Direct destination: <span className="font-medium">{COMPANY_INFO.email}</span>
                  </p>
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium text-white bg-blue-900 hover:bg-blue-950 rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 min-h-[44px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-900 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Quote Inquiry</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
