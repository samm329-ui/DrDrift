'use client';
import { useApp } from '@/hooks/use-app';
import { siteConfig } from '@/lib/config';
import { cn } from '@/lib/utils';

const RippleLoader = () => (
  <div className="loader">
    <div className="box"></div>
    <div className="box"></div>
    <div className="box"></div>
    <div className="box"></div>
    <div className="box"></div>
    <div className="logo">
      <h1 className="font-headline text-2xl font-bold tracking-wider text-primary">
        {siteConfig.brandName}
      </h1>
    </div>
  </div>
);

const Loader = () => {
  const { isLoading } = useApp();

  return (
    <div
      className={cn(
        'fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background transition-opacity duration-500',
        isLoading ? 'opacity-100' : 'opacity-0 pointer-events-none'
      )}
    >
      <RippleLoader />
    </div>
  );
};

export default Loader;
