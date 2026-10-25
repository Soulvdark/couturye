import React, { useEffect } from "react";
import { WorkItem, ReviewItem, SERVICES_DATA } from "../data/siteData";
import { SmartImage } from "./UiElements";

interface ModalsProps {
  activeWorkIndex: number | null;
  setActiveWorkIndex: React.Dispatch<React.SetStateAction<number | null>>;
  visibleWorks: WorkItem[];
  activeReviewIndex: number | null;
  setActiveReviewIndex: React.Dispatch<React.SetStateAction<number | null>>;
  visibleReviews: ReviewItem[];
  onBookService: (serviceTitle: string) => void;
}

export const Modals: React.FC<ModalsProps> = ({
  activeWorkIndex,
  setActiveWorkIndex,
  visibleWorks,
  activeReviewIndex,
  setActiveReviewIndex,
  visibleReviews,
  onBookService,
}) => {
  const activeWorkModal =
    activeWorkIndex !== null ? visibleWorks[activeWorkIndex] || null : null;
  const activeReviewModal =
    activeReviewIndex !== null
      ? visibleReviews[activeReviewIndex] || null
      : null;

  useEffect(() => {
    const isModalOpen = activeWorkIndex !== null || activeReviewIndex !== null;
    document.body.style.overflow = isModalOpen ? "hidden" : "";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isModalOpen) return;
      if (e.key === "Escape") {
        setActiveWorkIndex(null);
        setActiveReviewIndex(null);
      } else if (e.key === "ArrowRight") {
        if (activeWorkIndex !== null) {
          setActiveWorkIndex((prev) =>
            prev !== null ? (prev + 1) % visibleWorks.length : null,
          );
        }
        if (activeReviewIndex !== null) {
          setActiveReviewIndex((prev) =>
            prev !== null ? (prev + 1) % visibleReviews.length : null,
          );
        }
      } else if (e.key === "ArrowLeft") {
        if (activeWorkIndex !== null) {
          setActiveWorkIndex((prev) =>
            prev !== null
              ? (prev - 1 + visibleWorks.length) % visibleWorks.length
              : null,
          );
        }
        if (activeReviewIndex !== null) {
          setActiveReviewIndex((prev) =>
            prev !== null
              ? (prev - 1 + visibleReviews.length) % visibleReviews.length
              : null,
          );
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [
    activeWorkIndex,
    activeReviewIndex,
    visibleWorks.length,
    visibleReviews.length,
    setActiveWorkIndex,
    setActiveReviewIndex,
  ]);

  return (
    <>
      {/* 1. МОДАЛКА РАЗБОРА ОБРАЗА */}
      {activeWorkModal && activeWorkIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activeWorkModal.title}
          onClick={() => setActiveWorkIndex(null)}
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 lg:p-6"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-[#FAF8F5] border border-neutral-300 max-w-5xl w-full max-h-[94vh] flex flex-col md:grid md:grid-cols-12 overflow-hidden shadow-2xl"
          >
            <div className="flex md:hidden items-center justify-between px-4 py-3 bg-white border-b border-neutral-200 text-[10px] font-mono uppercase tracking-widest shrink-0">
              <span>
                {activeWorkModal.index} ({activeWorkIndex + 1} из{" "}
                {visibleWorks.length})
              </span>
              <button
                type="button"
                onClick={() => setActiveWorkIndex(null)}
                className="px-2.5 py-1 bg-neutral-900 text-white cursor-pointer"
              >
                Закрыть ×
              </button>
            </div>

            <div className="overflow-y-auto md:overflow-visible flex-1 md:col-span-12 md:grid md:grid-cols-12 md:max-h-[90vh]">
              <div className="md:col-span-6 lg:col-span-7 bg-[#181818] flex items-center justify-center p-3 sm:p-6 min-h-[320px] max-h-[58vh] md:max-h-[90vh] relative">
                <SmartImage
                  src={activeWorkModal.imageUrl}
                  alt={activeWorkModal.title}
                  className="max-h-[52vh] md:max-h-[82vh] w-auto object-contain shadow-lg"
                />

                {visibleWorks.length > 1 && (
                  <div className="absolute inset-x-3 bottom-3 flex justify-between pointer-events-none">
                    <button
                      type="button"
                      onClick={() =>
                        setActiveWorkIndex(
                          (activeWorkIndex - 1 + visibleWorks.length) %
                            visibleWorks.length,
                        )
                      }
                      className="pointer-events-auto px-3 py-1.5 bg-white/95 hover:bg-white text-neutral-900 text-[10px] font-mono uppercase tracking-widest shadow-md cursor-pointer"
                    >
                      ← Пред.
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setActiveWorkIndex(
                          (activeWorkIndex + 1) % visibleWorks.length,
                        )
                      }
                      className="pointer-events-auto px-3 py-1.5 bg-white/95 hover:bg-white text-neutral-900 text-[10px] font-mono uppercase tracking-widest shadow-md cursor-pointer"
                    >
                      След. →
                    </button>
                  </div>
                )}
              </div>

              <div className="md:col-span-6 lg:col-span-5 p-5 sm:p-8 flex flex-col justify-between md:overflow-y-auto md:max-h-[90vh]">
                <div>
                  <div className="hidden md:flex justify-between items-center text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-400 border-b border-neutral-200 pb-3">
                    <span>
                      {activeWorkModal.index} - {activeWorkIndex + 1} из{" "}
                      {visibleWorks.length}
                    </span>
                    <button
                      type="button"
                      onClick={() => setActiveWorkIndex(null)}
                      className="text-neutral-900 hover:underline cursor-pointer font-medium"
                    >
                      [ ЗАКРЫТЬ × ]
                    </button>
                  </div>

                  <span className="inline-block mt-2 md:mt-5 text-[10px] font-mono uppercase tracking-widest px-3 py-1 bg-neutral-200/80 text-neutral-800">
                    {activeWorkModal.categoryLabel}
                  </span>

                  <h3 className="mt-3 font-serif text-2xl sm:text-3xl text-neutral-900 leading-snug">
                    {activeWorkModal.title}
                  </h3>

                  <p className="mt-3 text-sm text-neutral-700 leading-relaxed">
                    {activeWorkModal.description}
                  </p>

                  <div className="mt-5 pt-4 border-t border-neutral-200">
                    <div className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 mb-2.5">
                      Ключевые элементы и решения:
                    </div>
                    <ul className="space-y-2 text-xs sm:text-sm text-neutral-800">
                      {activeWorkModal.detailsList.map((detail, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="font-mono text-neutral-400">•</span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-5 p-4 bg-white border border-neutral-200">
                    <div className="text-[9px] font-mono uppercase tracking-widest text-neutral-400 mb-1">
                      Заметка Полины Шуруповой:
                    </div>
                    <p className="text-xs sm:text-sm text-neutral-900 italic font-serif">
                      «{activeWorkModal.stylistNote}»
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-neutral-200">
                  <button
                    type="button"
                    onClick={() => onBookService(SERVICES_DATA[0].title)}
                    className="w-full py-3.5 bg-neutral-900 text-white text-xs font-mono uppercase tracking-[0.2em] hover:bg-neutral-800 transition-colors cursor-pointer"
                  >
                    Хочу подобный разбор / капсулу
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. МОДАЛКА ОТЗЫВА */}
      {activeReviewModal && activeReviewIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activeReviewModal.author}
          onClick={() => setActiveReviewIndex(null)}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 lg:p-6"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-[#FAF8F5] border border-neutral-300 max-w-4xl w-full max-h-[94vh] flex flex-col md:grid md:grid-cols-12 overflow-hidden shadow-2xl"
          >
            <div className="flex md:hidden items-center justify-between px-4 py-3 bg-white border-b border-neutral-200 text-[10px] font-mono uppercase tracking-widest shrink-0">
              <span>
                {activeReviewModal.code} ({activeReviewIndex + 1} из{" "}
                {visibleReviews.length})
              </span>
              <button
                type="button"
                onClick={() => setActiveReviewIndex(null)}
                className="px-2.5 py-1 bg-neutral-900 text-white cursor-pointer"
              >
                Закрыть ×
              </button>
            </div>

            <div className="overflow-y-auto md:overflow-visible flex-1 md:col-span-12 md:grid md:grid-cols-12 md:max-h-[90vh]">
              <div className="md:col-span-7 bg-[#141414] flex items-center justify-center p-3 sm:p-5 min-h-[360px] max-h-[62vh] md:max-h-[90vh] relative">
                <SmartImage
                  src={activeReviewModal.proofImage}
                  alt={activeReviewModal.proofCaption}
                  className="max-h-[56vh] md:max-h-[84vh] w-auto object-contain"
                />

                {visibleReviews.length > 1 && (
                  <div className="absolute inset-x-3 bottom-3 flex justify-between pointer-events-none">
                    <button
                      type="button"
                      onClick={() =>
                        setActiveReviewIndex(
                          (activeReviewIndex - 1 + visibleReviews.length) %
                            visibleReviews.length,
                        )
                      }
                      className="pointer-events-auto px-3 py-1.5 bg-white/95 hover:bg-white text-neutral-900 text-[10px] font-mono uppercase tracking-widest shadow-md cursor-pointer"
                    >
                      ← Пред.
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setActiveReviewIndex(
                          (activeReviewIndex + 1) % visibleReviews.length,
                        )
                      }
                      className="pointer-events-auto px-3 py-1.5 bg-white/95 hover:bg-white text-neutral-900 text-[10px] font-mono uppercase tracking-widest shadow-md cursor-pointer"
                    >
                      След. →
                    </button>
                  </div>
                )}
              </div>

              <div className="md:col-span-5 p-5 sm:p-8 flex flex-col justify-between md:overflow-y-auto md:max-h-[90vh]">
                <div>
                  <div className="hidden md:flex justify-between items-center text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-400 border-b border-neutral-200 pb-3">
                    <span>{activeReviewModal.code}</span>
                    <button
                      type="button"
                      onClick={() => setActiveReviewIndex(null)}
                      className="text-neutral-900 hover:underline cursor-pointer font-medium"
                    >
                      [ ЗАКРЫТЬ × ]
                    </button>
                  </div>

                  <span className="inline-block mt-2 md:mt-5 text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 bg-neutral-200/80">
                    {activeReviewModal.tag}
                  </span>

                  <h3 className="mt-3 font-serif text-xl sm:text-2xl text-neutral-900">
                    {activeReviewModal.author}
                  </h3>

                  <div className="mt-4 p-3.5 bg-amber-50/90 border border-amber-200/80 font-serif italic text-base text-neutral-900">
                    «{activeReviewModal.highlight}»
                  </div>

                  <p className="mt-4 text-xs sm:text-sm text-neutral-700 leading-relaxed">
                    {activeReviewModal.quote}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => onBookService(SERVICES_DATA[0].title)}
                  className="mt-6 w-full py-3.5 bg-neutral-900 text-white text-xs font-mono uppercase tracking-[0.2em] hover:bg-neutral-800 transition-colors cursor-pointer"
                >
                  Записаться к Полине
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
