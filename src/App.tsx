import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import {
  WORKS_DATA,
  REVIEWS_DATA,
  SERVICES_DATA,
  WorkCategory,
  ReviewCategory,
  FormState,
} from "./data/siteData";
import { IntroOverlay } from "./components/UiElements";
import { Header } from "./components/Header";
import { HeroAndAbout } from "./components/HeroAndAbout";
import { PortfolioSection } from "./components/PortfolioSection";
import { ServicesAndReviews } from "./components/ServicesAndReviews";
import { ContactAndFooter } from "./components/ContactAndFooter";
import { Modals } from "./components/Modals";

export const App: React.FC = () => {
  const [isColorAwakened, setIsColorAwakened] = useState(false);
  const [workFilter, setWorkFilter] = useState<WorkCategory>("all");
  const [reviewFilter, setReviewFilter] = useState<ReviewCategory>("all");

  const [activeWorkIndex, setActiveWorkIndex] = useState<number | null>(null);
  const [activeReviewIndex, setActiveReviewIndex] = useState<number | null>(
    null,
  );

  const [formState, setFormState] = useState<FormState>({
    name: "",
    contact: "",
    service: SERVICES_DATA[0].title,
    message: "",
  });

  const worksRef = useRef<HTMLElement | null>(null);
  const contactRef = useRef<HTMLElement | null>(null);

  const visibleWorks = useMemo(() => {
    if (workFilter === "all") return WORKS_DATA;
    return WORKS_DATA.filter((w) => w.category === workFilter);
  }, [workFilter]);

  const visibleReviews = useMemo(() => {
    if (reviewFilter === "all") return REVIEWS_DATA;
    return REVIEWS_DATA.filter((r) => r.category === reviewFilter);
  }, [reviewFilter]);

  useEffect(() => {
    const section = worksRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsColorAwakened(true);
          } else if (entry.boundingClientRect.top > 350) {
            setIsColorAwakened(false);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -5% 0px" },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const handleBookService = useCallback((serviceTitle: string) => {
    setFormState((prev) => ({ ...prev, service: serviceTitle }));
    setActiveWorkIndex(null);
    setActiveReviewIndex(null);
    window.setTimeout(() => {
      contactRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, []);

  return (
    <div
      className={`min-h-screen transition-colors duration-1000 ease-out selection:bg-neutral-900 selection:text-white ${
        isColorAwakened
          ? "bg-[#F5F0E8] text-[#191715]"
          : "bg-[#EFEFEE] text-[#151515]"
      }`}
    >
      <IntroOverlay />
      <Header />
      <HeroAndAbout isColorAwakened={isColorAwakened} />

      <PortfolioSection
        worksRef={worksRef}
        isColorAwakened={isColorAwakened}
        workFilter={workFilter}
        setWorkFilter={(cat) => {
          setWorkFilter(cat);
          setActiveWorkIndex(null);
        }}
        visibleWorks={visibleWorks}
        onSelectWork={setActiveWorkIndex}
      />

      <ServicesAndReviews
        reviewFilter={reviewFilter}
        setReviewFilter={(cat) => {
          setReviewFilter(cat);
          setActiveReviewIndex(null);
        }}
        visibleReviews={visibleReviews}
        onSelectReview={setActiveReviewIndex}
        onBookService={handleBookService}
      />

      <ContactAndFooter
        contactRef={contactRef}
        formState={formState}
        setFormState={setFormState}
      />

      <Modals
        activeWorkIndex={activeWorkIndex}
        setActiveWorkIndex={setActiveWorkIndex}
        visibleWorks={visibleWorks}
        activeReviewIndex={activeReviewIndex}
        setActiveReviewIndex={setActiveReviewIndex}
        visibleReviews={visibleReviews}
        onBookService={handleBookService}
      />
    </div>
  );
};

export default App;
