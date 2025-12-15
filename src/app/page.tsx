'use client';

import { useApp } from '@/hooks/use-app';
import Loader from '@/components/loader';
import HeroSection from '@/components/sections/hero-section';
import ProductSection from '@/components/sections/product-section';
import OurProductsSection from '@/components/sections/our-products-section';
import IngredientsSection from '@/components/sections/ingredients-section';
import SafetySection from '@/components/sections/safety-section';
import ReviewsSection from '@/components/sections/reviews-section';
import FaqSection from '@/components/sections/faq-section';
import CtaSection from '@/components/sections/cta-section';

export default function Home() {
  const { isLoading } = useApp();

  return (
    <>
      <Loader />
      {!isLoading && (
        <div className='bg-background'>
          <HeroSection />
          <ProductSection />
          <OurProductsSection />
          <IngredientsSection />
          <SafetySection />
          <ReviewsSection />
          <FaqSection />
          <CtaSection />
        </div>
      )}
    </>
  );
}
