import { Maximize2, Package } from 'lucide-react';
import { useState } from 'react';

interface ProductImageProps {
  src: string;
  alt: string;
  title: string;
  className?: string;
  fit?: 'cover' | 'contain';
  zoomLabel?: string;
  onZoom?: () => void;
}

export function ProductImage({
  src,
  alt,
  title,
  className = '',
  fit = 'cover',
  zoomLabel = 'Inspect Image',
  onZoom,
}: ProductImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-slate-100 border border-slate-200 rounded-md p-6 text-center ${className}`}
      >
        <Package className="w-10 h-10 text-slate-400 mb-3" strokeWidth={1.5} />
        <p className="text-sm font-medium text-slate-700">{title}</p>
        <p className="text-xs text-slate-500 mt-1">Product imagery</p>
      </div>
    );
  }

  return (
    <div
      className={`relative group bg-slate-100 border border-slate-200 rounded-md overflow-hidden ${className}`}
    >
      <img
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        onError={() => setHasError(true)}
        className={`w-full h-full transition-transform duration-200 ${
          fit === 'cover' ? 'object-cover group-hover:scale-[1.02]' : 'object-contain bg-white p-2 sm:p-3'
        }`}
      />
      {onZoom && (
        <button
          type="button"
          onClick={onZoom}
          aria-label={`${zoomLabel}: ${title}`}
          className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-800 bg-white/95 hover:bg-slate-900 hover:text-white border border-slate-200 rounded-md shadow-xs transition-colors duration-150 min-h-[36px] focus-visible:outline-2 focus-visible:outline-blue-900 cursor-pointer"
        >
          <Maximize2 className="w-3.5 h-3.5" />
          <span>{zoomLabel}</span>
        </button>
      )}
    </div>
  );
}
