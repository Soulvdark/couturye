import { useState } from "react";

export const Header = () => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-white/85 border-b border-neutral-300/90 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <a href="#top" className="flex flex-col shrink-0">
          <span className="font-serif text-base sm:text-xl tracking-[0.12em] uppercase text-neutral-900">
            Полина Шурупова
          </span>
          <span className="text-[8px] sm:text-[9px] font-mono uppercase tracking-[0.18em] text-neutral-500 -mt-0.5">
            Стилист и историк моды
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-[11px] font-mono uppercase tracking-[0.16em]">
          <a href="#about" className="hover:text-neutral-500 transition-colors">
            01 / О себе
          </a>
          <a href="#works" className="hover:text-neutral-500 transition-colors">
            02 / Лукбук работ
          </a>
          <a
            href="#services"
            className="hover:text-neutral-500 transition-colors"
          >
            03 / Услуги и прайс
          </a>
          <a
            href="#reviews"
            className="hover:text-neutral-500 transition-colors"
          >
            04 / Отзывы клиентов
          </a>
        </nav>

        <div className="hidden sm:flex items-center gap-3">
          <a
            href="#contact"
            className="px-4 py-2 text-[10px] xl:text-[11px] font-mono uppercase tracking-[0.18em] border border-neutral-900 hover:bg-neutral-900 hover:text-white transition-colors"
          >
            [ Обсудить гардероб ]
          </a>
        </div>

        <button
          type="button"
          onClick={() => setMobileNavOpen((v) => !v)}
          aria-expanded={mobileNavOpen}
          aria-label="Открыть меню навигации"
          className="lg:hidden px-3 py-1.5 text-[10px] font-mono uppercase tracking-widest border border-neutral-400 bg-white cursor-pointer"
        >
          {mobileNavOpen ? "Закрыть ×" : "Меню ≡"}
        </button>
      </div>

      {mobileNavOpen && (
        <nav className="lg:hidden border-b border-neutral-300 bg-[#F3F2EE] px-5 py-6 flex flex-col gap-4 text-xs font-mono uppercase tracking-[0.18em] shadow-lg">
          <a
            href="#about"
            onClick={() => setMobileNavOpen(false)}
            className="py-1 border-b border-neutral-200"
          >
            01 / О себе и метод
          </a>
          <a
            href="#works"
            onClick={() => setMobileNavOpen(false)}
            className="py-1 border-b border-neutral-200"
          >
            02 / Лукбук работ (Женские и мужские)
          </a>
          <a
            href="#services"
            onClick={() => setMobileNavOpen(false)}
            className="py-1 border-b border-neutral-200"
          >
            03 / Услуги и прайс
          </a>
          <a
            href="#reviews"
            onClick={() => setMobileNavOpen(false)}
            className="py-1 border-b border-neutral-200"
          >
            04 / Отзывы клиентов
          </a>
          <a
            href="#contact"
            onClick={() => setMobileNavOpen(false)}
            className="mt-2 py-3.5 bg-neutral-900 text-white text-center text-[11px]"
          >
            Записаться на консультацию
          </a>
        </nav>
      )}
    </header>
  );
};
