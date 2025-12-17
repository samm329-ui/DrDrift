'use client';

import { useApp } from '@/hooks/use-app';
import HeroSection from '@/components/sections/hero-section';
import ProductSection from '@/components/sections/product-section';
import OurProductsSection from '@/components/sections/our-products-section';
import IngredientsSection from '@/components/sections/ingredients-section';
import SafetySection from '@/components/sections/safety-section';
import ReviewsSection from '@/components/sections/reviews-section';
import FaqSection from '@/components/sections/faq-section';
import CtaSection from '@/components/sections/cta-section';
import FeedbackSection from '@/components/sections/feedback-section';
import SearchBar from '@/components/search-bar';
import { cn } from '@/lib/utils';

export default function Home() {
  const { isLoading } = useApp();

  return (
    <>
      {!isLoading && (
        <div className="bg-background">
          {/* Mobile Layout: OurProducts is first */}
          <div className="md:hidden">
            <div className="pt-8 px-4">
              <SearchBar />
            </div>
            <OurProductsSection />
          </div>

          {/* Desktop Layout: Hero and Product are first */}
          <div className="hidden md:block">
            <HeroSection />
            <ProductSection />
            <OurProductsSection />
          </div>
          
          {/* Common sections for both layouts */}
          <IngredientsSection />
          <SafetySection />
          <ReviewsSection />
          <FaqSection />
          <CtaSection />
          <FeedbackSection />
        </div>
      )}
    </>
  );
}
