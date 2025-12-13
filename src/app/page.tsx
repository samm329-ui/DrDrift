'use client';

import { useApp } from '@/hooks/use-app';
import Loader from '@/components/loader';
import Navbar from '@/components/navbar';
import HeroSection from '@/components/sections/hero-section';
import ProductSection from '@/components/sections/product-section';
import IngredientsSection from '@/components/sections/ingredients-section';
import SafetySection from '@/components/sections/safety-section';
import ReviewsSection from '@/components/sections/reviews-section';
import FaqSection from '@/components/sections/faq-section';
import CtaSection from '@/components/sections/cta-section';
import Footer from '@/components/footer';

export default function Home() {
  const { isLoading } = useApp();

  return (
    <>
      <Loader />
      {!isLoading && (
        <>
          <Navbar />
          <main className="flex flex-col">
            <HeroSection />
            <ProductSection />
            <IngredientsSection />
            <SafetySection />
            <ReviewsSection />
            <FaqSection />
            <CtaSection />
          </main>
          <Footer />
        </>
      )}
    </>
  );
}
