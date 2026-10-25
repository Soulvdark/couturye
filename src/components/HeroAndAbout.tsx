import React, { useState } from "react";
import { PHOTOS, MOOD_STRIP_DATA } from "../data/siteData";
import {
  SmartImage,
  BinderClip,
  PaperClip,
  ArchiveRingsDivider,
} from "./UiElements";

interface HeroAndAboutProps {
  isColorAwakened: boolean;
}

export const HeroAndAbout: React.FC<HeroAndAboutProps> = ({
  isColorAwakened,
}) => {
  const [heroForceColor, setHeroForceColor] = useState(false);

  return (
    <>
      {/* БЛОК 1. ПЕРВЫЙ ЭКРАН */}
      <section
        id="top"
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-16 lg:py-16 overflow-hidden"
      >
        <div className="flex flex-wrap items-center justify-between text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-500 border-b border-neutral-300 pb-3 mb-8 lg:mb-12 gap-2">
          <span>АРХИВ 2026 // ПЕРСОНАЛЬНЫЙ СТИЛЬ И ИСТОРИЯ КОСТЮМА</span>
          <span>ЖЕНСКИЕ И МУЖСКИЕ ГАРДЕРОБЫ • ОНЛАЙН / ОФЛАЙН</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          <div className="lg:col-span-6 space-y-6 sm:space-y-7 order-2 lg:order-1">
            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 bg-white border border-neutral-300 text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-700">
              <span className="w-1.5 h-1.5 rounded-full bg-red-700 shrink-0" />
              <span>Стилист и историк моды • 7 лет в профессии</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl xl:text-7xl leading-[1.04] tracking-tight text-neutral-900 font-normal">
              Полина <br />
              Шурупова
            </h1>

            <div className="space-y-3 max-w-xl">
              <p className="text-base sm:text-lg xl:text-xl text-neutral-800 leading-relaxed font-light">
                Помогаю найти свой стиль, собрать гардероб для реальной жизни и
                понять, почему одни вещи становятся любимыми, а другие так и
                остаются в шкафу.
              </p>
              <p className="text-sm sm:text-base text-neutral-700 leading-relaxed">
                Мне важно не просто, чтобы одежда вам шла. А чтобы в ней вы
                чувствовали себя собой.
              </p>
            </div>

            <div className="relative bg-white/90 border border-neutral-300 p-4 sm:p-5 max-w-lg">
              <PaperClip className="absolute -top-3.5 right-5" />
              <div className="text-[9px] font-mono uppercase tracking-[0.2em] text-neutral-500 mb-1.5">
                КАК Я РАБОТАЮ:
              </div>
              <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed">
                Я соединяю практику стилиста с историей костюма и вниманием к
                личности. Помогаю увидеть, как цвет, форма, фактура и детали
                отражают характер, образ жизни и внутренние перемены.
              </p>
            </div>

            <div className="pt-1 flex flex-col sm:flex-row gap-3 sm:gap-4">
              <a
                href="#contact"
                className="px-7 py-4 bg-neutral-900 text-white text-xs font-mono uppercase tracking-[0.2em] text-center hover:bg-neutral-800 transition-colors"
              >
                Обсудить гардероб
              </a>
              <a
                href="#reviews"
                className="px-6 py-4 bg-white border border-neutral-900 text-neutral-900 text-xs font-mono uppercase tracking-[0.16em] text-center hover:bg-neutral-100 transition-colors"
              >
                Смотреть отзывы (они больше говорят обо мне) ↓
              </a>
            </div>
          </div>

          <div className="lg:col-span-6 order-1 lg:order-2">
            <div className="relative mx-auto max-w-md lg:max-w-lg sm:pl-12 sm:pb-10">
              <div className="relative z-10 bg-white p-3.5 sm:p-5 border border-neutral-300 shadow-xl group">
                <BinderClip className="absolute -top-5 left-8 z-30" />

                <div
                  onClick={() => setHeroForceColor((v) => !v)}
                  className="relative aspect-[3/4] overflow-hidden bg-neutral-200 cursor-pointer"
                >
                  <SmartImage
                    src={PHOTOS.heroRedBelt}
                    alt="Полина Шурупова - персональный стилист"
                    className={`w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-[1.02] ${
                      isColorAwakened || heroForceColor
                        ? "grayscale-0 contrast-100"
                        : "grayscale contrast-125 group-hover:grayscale-0"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setHeroForceColor((v) => !v);
                    }}
                    className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 text-[9px] font-mono uppercase tracking-[0.16em] text-neutral-900 border border-neutral-300 shadow-sm hover:bg-neutral-900 hover:text-white transition-colors cursor-pointer"
                  >
                    {isColorAwakened || heroForceColor
                      ? "● ЦВЕТ ВКЛЮЧЁН"
                      : "○ ВКЛЮЧИТЬ ЦВЕТ"}
                  </button>
                </div>

                <div className="mt-3 pt-2.5 border-t border-neutral-200 flex items-center justify-between sm:justify-end gap-3 text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.16em] text-neutral-500 sm:pl-28">
                  <span>№ 01 / СИЛУЭТ</span>
                  <span className="hidden sm:inline text-neutral-300">•</span>
                  <span className="text-neutral-800">ПОЛИНА ШУРУПОВА</span>
                </div>
              </div>

              <div className="hidden sm:block absolute bottom-0 left-0 z-20 w-36 md:w-40 bg-white p-2 border border-neutral-300 shadow-xl -rotate-3 hover:rotate-0 transition-transform duration-500">
                <div className="aspect-[3/4] overflow-hidden bg-neutral-100">
                  <SmartImage
                    src={PHOTOS.portraitWhiteClose}
                    alt="Портрет Полины Шуруповой"
                    className={`w-full h-full object-cover transition-all duration-700 ${
                      isColorAwakened || heroForceColor
                        ? "grayscale-0"
                        : "grayscale hover:grayscale-0"
                    }`}
                  />
                </div>
                <div className="mt-1.5 text-[8px] font-mono uppercase tracking-widest text-neutral-500 text-center">
                  № 02 / ПОРТРЕТ
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ArchiveRingsDivider />

      {/* БЛОК 2. О СЕБЕ И МЕТОДЕ РАБОТЫ */}
      <section
        id="about"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20"
      >
        <div className="bg-white border border-neutral-300 p-5 sm:p-10 lg:p-14 shadow-sm">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-neutral-200 pb-5 mb-10 gap-3">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-neutral-400 block mb-1">
                РАЗДЕЛ 01 // О СТИЛИСТЕ И ПОДХОДЕ
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl tracking-tight font-normal">
                Одежда как визуальная биография
              </h2>
            </div>
            <div className="px-3 py-1.5 bg-neutral-100 border border-neutral-300 text-[10px] font-mono uppercase tracking-[0.18em]">
              Женские и мужские гардеробы
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-5">
              <div className="bg-[#FAF9F6] p-3.5 border border-neutral-200">
                <div className="aspect-[4/5] overflow-hidden bg-neutral-100">
                  <SmartImage
                    src={PHOTOS.portraitShowroomBW}
                    alt="Полина Шурупова в шоуруме"
                    loading="lazy"
                    className="w-full h-full object-cover grayscale contrast-125"
                  />
                </div>
                <div className="mt-2.5 flex justify-between text-[9px] font-mono uppercase tracking-[0.18em] text-neutral-500">
                  <span>КАДР 01 - ПРАКТИКА В ШОУРУМЕ</span>
                  <span>Ч/Б АРХИВ</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-7">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 border-b border-neutral-200 pb-7">
                <div className="p-4 sm:p-5 bg-[#FAF9F6] border border-neutral-200">
                  <span className="text-[9px] font-mono uppercase tracking-widest text-neutral-400">
                    ОПЫТ
                  </span>
                  <div className="font-serif text-2xl xl:text-3xl text-neutral-900 mt-1.5">
                    7 лет
                  </div>
                  <div className="mt-1 text-xs text-neutral-600 leading-snug">
                    непрерывной практики персональным стилистом
                  </div>
                </div>

                <div className="p-4 sm:p-5 bg-[#FAF9F6] border border-neutral-200">
                  <span className="text-[9px] font-mono uppercase tracking-widest text-neutral-400">
                    ГАРДЕРОБЫ
                  </span>
                  <div className="font-serif text-xl xl:text-2xl text-neutral-900 mt-1.5 leading-tight">
                    Женские и мужские
                  </div>
                  <div className="mt-1 text-xs text-neutral-600 leading-snug">
                    персональный стайлинг и капсулы для жизни
                  </div>
                </div>

                <div className="p-4 sm:p-5 bg-[#FAF9F6] border border-neutral-200">
                  <span className="text-[9px] font-mono uppercase tracking-widest text-neutral-400">
                    ФУНДАМЕНТ
                  </span>
                  <div className="font-serif text-xl xl:text-2xl text-neutral-900 mt-1.5 leading-tight">
                    История моды
                  </div>
                  <div className="mt-1 text-xs text-neutral-600 leading-snug">
                    работа с силуэтом, цветом и личностью
                  </div>
                </div>
              </div>

              <div className="space-y-4 text-neutral-700 leading-relaxed text-sm sm:text-base">
                <p className="font-serif text-xl sm:text-2xl text-neutral-900 italic leading-snug">
                  «Стиль начинается не с правил. Он начинается с понимания себя
                  и того, как вы хотите чувствовать себя в своей одежде».
                </p>
                <p>
                  Я соединяю практику стилиста и историка моды с психологией. Мы
                  разбираемся, что вам действительно близко, как вы живёте и что
                  хотите выражать через одежду. Цвет, форма, фактура и детали
                  становятся инструментами, а не набором правил.
                </p>
                <p>
                  Моя задача - не переделать вас и не собрать гардероб ради
                  красивой картинки. Мы ищем сочетания, которые подходят вашей
                  реальной жизни, и учимся по-новому смотреть на уже имеющиеся
                  вещи. В результате становится проще выбирать одежду и собирать
                  образы самостоятельно.
                </p>
              </div>

              <div className="bg-[#FAF9F6] border border-neutral-200 p-5 sm:p-6 space-y-3">
                <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-500">
                  ЧТО МЕНЯЕТСЯ ПОСЛЕ СОВМЕСТНОЙ РАБОТЫ:
                </div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs sm:text-sm text-neutral-800">
                  <li className="flex items-start gap-2">
                    <span className="font-mono text-neutral-400">01/</span>
                    <span>
                      Вы лучше понимаете, какие вещи вам действительно подходят.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-mono text-neutral-400">02/</span>
                    <span>
                      Из одежды в вашем гардеробе складываются новые сочетания
                      (собранные мной в удобный лукбук).
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-mono text-neutral-400">03/</span>
                    <span>
                      Меньше случайных покупок и вещей, которые висят без дела.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-mono text-neutral-400">04/</span>
                    <span>
                      Вы собираете образы под свою жизнь, а не под чужие
                      правила.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ПОЛОСА ФАКТУР */}
      <section className="py-8 sm:py-10 border-t border-b border-neutral-300/80 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-5 flex items-center justify-between text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.22em] text-neutral-500">
          <span>ВИЗУАЛЬНЫЙ АРХИВ // ФАКТУРЫ И ПАЛИТРА</span>
          <span className="sm:hidden">ЛИСТАЙТЕ ВБОК →</span>
          <span className="hidden sm:inline">ФАКТУРЫ И ДЕТАЛИ</span>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex lg:grid lg:grid-cols-6 gap-4 overflow-x-auto pb-2 snap-x snap-mandatory">
          {MOOD_STRIP_DATA.map((item) => (
            <div
              key={item.id}
              className="w-44 sm:w-52 lg:w-auto shrink-0 snap-start bg-white p-2.5 border border-neutral-300 shadow-sm hover:shadow-lg transition-all duration-500"
            >
              <div className="aspect-[4/5] overflow-hidden bg-neutral-100">
                <SmartImage
                  src={item.imageUrl}
                  alt={item.caption}
                  loading="lazy"
                  className={`w-full h-full object-cover transition-all duration-700 ${
                    isColorAwakened
                      ? "grayscale-0"
                      : "grayscale hover:grayscale-0"
                  }`}
                />
              </div>
              <div className="mt-2">
                <div className="text-[8px] font-mono uppercase tracking-widest text-neutral-400">
                  {item.code}
                </div>
                <p className="text-[11px] font-serif text-neutral-800 leading-tight mt-0.5">
                  {item.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};
