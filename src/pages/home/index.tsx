import { ApplicationSection } from "widgets/landing/application-section";
import { BenefitsGrid } from "widgets/landing/benefits-grid";
import { FAQSection } from "widgets/landing/faq-section";
import { HeroSection } from "widgets/landing/hero-section";

const HomePage = () => {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-10 p-4 pt-6 md:px-6">
      <HeroSection />
      <BenefitsGrid />
      <FAQSection />
      <ApplicationSection />
    </main>
  );
};

export default HomePage;
