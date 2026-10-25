import React from "react";
import { WorkCategory, WorkItem } from "../data/siteData";
import { SmartImage } from "./UiElements";

interface PortfolioSectionProps {
  worksRef: React.RefObject<HTMLElement | null>;
  isColorAwakened: boolean;
  workFilter: WorkCategory;
  setWorkFilter: (cat: WorkCategory) => void;
  visibleWorks: WorkItem[];
  onSelectWork: (index: number) => void;
}

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({
  worksRef,
  isColorAwakened,
  workFilter,
  setWorkFilter,
  visibleWorks,
  onSelectWork,
}) => {
  return (
    <section
      id="works"
      ref={worksRef}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 transition-colors duration-1000"
    >
      <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 sm:mb-14 border-b border-neutral-300 pb-6 gap-5">
        <div>
          <div className="flex items-center gap-2.5 mb-2">

            <span className="text-[10px] font-mono uppercase tracking-[0.24em] text-neutral-500">
              {isColorAwakened
                ? "РАЗДЕЛ 02 // ЖИВАЯ ПАЛИТРА РАБОТ"
                : "РАЗДЕЛ 02 // ЛУКБУК И ПОРТФОЛИО"}
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl tracking-tight font-normal">
            Портфолио: образы и капсулы
          </h2>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap">
          {(
            [
              { id: "all", label: "Все образы (9)" },
              { id: "womenswear", label: "Женские образы" },
              { id: "menswear", label: "Мужские капсулы" },
              { id: "capsules", label: "Сложный цвет" },
              { id: "details", label: "Фактуры" },
            ] as { id: WorkCategory; label: string }[]
          ).map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setWorkFilter(tab.id)}
              className={`shrink-0 px-3.5 py-2 text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.16em] border transition-all cursor-pointer ${
                workFilter === tab.id
                  ? "bg-neutral-900 text-white border-neutral-900"
                  : "bg-white/90 text-neutral-700 border-neutral-300 hover:border-neutral-800"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 items-start">
        {visibleWorks.map((work, idx) => (
          <article
            key={work.id}
            onClick={() => onSelectWork(idx)}
            className={`group cursor-pointer bg-white p-4 sm:p-6 border border-neutral-300 shadow-sm hover:shadow-xl transition-all duration-500 ${work.colSpanClass} ${
              work.offsetClass || ""
            }`}
          >
            <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.18em] text-neutral-400 border-b border-neutral-100 pb-2.5 mb-4">
              <span className="text-neutral-900 font-medium">{work.index}</span>
              <span>{work.categoryLabel}</span>
            </div>

            <div className="relative w-full aspect-[4/5] overflow-hidden bg-neutral-100 mb-4">
              <SmartImage
                src={work.imageUrl}
                alt={work.title}
                loading="lazy"
                className={`w-full h-full object-cover object-top transition-all duration-700 ease-out group-hover:scale-[1.03] ${
                  isColorAwakened
                    ? "grayscale-0 contrast-100"
                    : "grayscale contrast-125"
                }`}
              />
              <div className="absolute bottom-3 right-3 bg-white/95 px-3 py-1.5 text-[9px] font-mono uppercase tracking-[0.18em] text-neutral-900 border border-neutral-200 shadow-sm">
                [ Разбор образа + ]
              </div>
            </div>

            <h3 className="font-serif text-xl sm:text-2xl lg:text-3xl text-neutral-900 leading-snug group-hover:underline underline-offset-4">
              {work.title}
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-neutral-600 leading-relaxed line-clamp-2">
              {work.description}
            </p>

            <div className="mt-4 pt-3 border-t border-neutral-200/80 flex items-center justify-between gap-4">
              <span className="text-xs text-neutral-500 italic font-serif truncate">
                «{work.stylistNote}»
              </span>
              <span className="text-xs font-mono text-neutral-900 shrink-0 group-hover:translate-x-1 transition-transform">
                →
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
