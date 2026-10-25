import React, { useState, useEffect, useMemo } from 'react';
import { PHOTOS } from '../data/siteData';

export const SmartImage: React.FC<React.ImgHTMLAttributes<HTMLImageElement>> = ({ src, alt, ...props }) => {
  const [hasTriedFallback, setHasTriedFallback] = useState(false);

  const resolvedSrc = useMemo(() => {
    if (!src) return '';
    if (src.startsWith('http') || src.startsWith('data:')) return src;
    const cleanPath = src.replace(/^\/?public\//, '').replace(/^\//, '');
    return `./${cleanPath}`;
  }, [src]);

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    if (hasTriedFallback) return;
    setHasTriedFallback(true);
    const target = e.currentTarget;
    if (src && target.src !== src) {
      target.src = src;
    }
  };

  return <img src={resolvedSrc} alt={alt || ''} onError={handleError} {...props} />;
};

export const BinderClip: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 44 68"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`w-6 h-10 sm:w-7 sm:h-11 pointer-events-none select-none drop-shadow-md ${className}`}
    aria-hidden="true"
  >
    <rect x="6" y="2" width="32" height="24" rx="2" fill="#181818" />
    <line x1="6" y1="9" x2="38" y2="9" stroke="#4B4B4B" strokeWidth="1.2" />
    <path
      d="M14 26L9 59C8.5 62 11 64 14 64H30C33 64 35.5 62 35 59L30 26"
      stroke="#5A5A5A"
      strokeWidth="2.4"
      strokeLinecap="round"
    />
  </svg>
);

export const PaperClip: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 28 76"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`w-4 h-12 sm:w-5 sm:h-14 pointer-events-none select-none ${className}`}
    aria-hidden="true"
  >
    <path
      d="M19 18V56C19 61.5228 14.5228 66 9 66C3.47715 66 2 61.5228 2 56V14C2 6.8203 7.8203 2 14 2C20.1797 2 25 6.8203 25 14V52"
      stroke="#787570"
      strokeWidth="2.2"
      strokeLinecap="round"
    />
  </svg>
);

export const ArchiveRingsDivider: React.FC = () => (
  <div
    className="relative w-full py-6 sm:py-10 flex items-center justify-between max-w-5xl mx-auto px-6 sm:px-10 select-none"
    aria-hidden="true"
  >
    <div className="absolute inset-x-0 top-1/2 h-px bg-neutral-300" />
    {[0, 1, 2].map((idx) => (
      <div key={idx} className="relative z-10 flex flex-col items-center px-3 sm:px-4">
        <div className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full border border-neutral-500 bg-neutral-200 shadow-inner" />
        <div className="w-1 sm:w-1.5 h-7 sm:h-9 bg-gradient-to-b from-neutral-800 via-neutral-400 to-neutral-800 rounded-full -my-1 shadow-sm" />
        <div className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full border border-neutral-500 bg-neutral-200 shadow-inner" />
      </div>
    ))}
  </div>
);

export const IntroOverlay: React.FC = () => {
  const [introState, setIntroState] = useState<'holding' | 'tossing' | 'hidden'>('holding');

  useEffect(() => {
    const tossTimer = window.setTimeout(() => setIntroState('tossing'), 1000);
    const hideTimer = window.setTimeout(() => setIntroState('hidden'), 1750);
    return () => {
      window.clearTimeout(tossTimer);
      window.clearTimeout(hideTimer);
    };
  }, []);

  if (introState === 'hidden') return null;

  return (
    <div
      onClick={() => setIntroState('hidden')}
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#E8E8E6] px-6 transition-all duration-700 ease-out cursor-pointer ${
        introState === 'tossing' ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100'
      }`}
    >
      <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-neutral-500 mb-6 text-center">
        ПЕРСОНАЛЬНЫЙ СТАЙЛИНГ И ИСТОРИЯ КОСТЮМА
      </div>

      <div className="relative w-56 sm:w-64 aspect-[4/5]">
        <div className="absolute inset-0 bg-white p-2.5 border border-neutral-300 shadow-lg rotate-3 scale-95">
          <SmartImage
            src={PHOTOS.portraitTopDown}
            alt="Архив образов Полины Шуруповой"
            className="w-full h-full object-cover grayscale contrast-125"
          />
        </div>

        <div
          className={`relative z-10 w-full h-full bg-white p-3 border border-neutral-300 shadow-2xl transition-all duration-700 ${
            introState === 'tossing'
              ? '-translate-y-32 -rotate-12 scale-105 opacity-0'
              : 'translate-y-0 -rotate-2 scale-100 opacity-100'
          }`}
        >
          <SmartImage
            src={PHOTOS.detailHandBagJjoir}
            alt="Полина Шурупова - детали стиля"
            className="w-full h-full object-cover grayscale contrast-125"
          />
          <div className="mt-2 flex justify-between text-[9px] font-mono uppercase tracking-widest text-neutral-500">
            <span>КАДР № 01</span>
            <span>ДЕТАЛИ И СТИЛЬ</span>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center">
        <p className="font-serif text-xl sm:text-2xl tracking-[0.18em] uppercase text-neutral-900">
          Полина Шурупова
        </p>
        <p className="mt-1 text-[10px] font-mono uppercase tracking-[0.25em] text-neutral-500">
          Стилист и историк моды
        </p>
      </div>
    </div>
  );
};