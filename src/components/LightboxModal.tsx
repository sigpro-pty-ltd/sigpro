import { X } from 'lucide-react';
import { useEffect } from 'react';

interface LightboxModalProps {
  src: string;
  alt: string;
  title: string;
  onClose: () => void;
}

export function LightboxModal({ src, alt, title, onClose }: LightboxModalProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${title} specification sheet`}
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 p-4 sm:p-6"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-white rounded-lg border border-slate-200 shadow-xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-200 bg-slate-50">
          <h3 className="text-sm font-display font-semibold text-slate-900 truncate pr-4">
            {title}
          </h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close preview"
            className="inline-flex items-center justify-center w-9 h-9 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-200/70 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-blue-900 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-4 sm:p-6 bg-white flex items-center justify-center max-h-[80vh] overflow-auto">
          <img
            src={src}
            alt={alt}
            referrerPolicy="no-referrer"
            className="max-w-full max-h-[70vh] object-contain"
          />
        </div>
      </div>
    </div>
  );
}
