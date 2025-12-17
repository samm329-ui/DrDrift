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
          {/* Hero Section for Desktop */}
          <div className="hidden md:block">
            <HeroSection />
          </div>

          {/* Search Bar for Mobile */}
          <div className="md:hidden pt-8 px-4">
            <SearchBar />
          </div>

          {/* Hidden on mobile, as per previous request to only show OurProducts and below */}
          <div className="hidden md:block">
            <ProductSection />
          </div>

          {/* OurProducts and subsequent sections visible on all screen sizes */}
          <OurProductsSection />
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
