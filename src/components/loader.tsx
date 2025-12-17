'use client';
import { useApp } from '@/hooks/use-app';
import { siteConfig } from '@/lib/config';
import { cn } from '@/lib/utils';

const TypingLoader = () => (
  <div className="typing-indicator">
    <div className="typing-circle"></div>
    <div className="typing-circle"></div>
    <div className="typing-circle"></div>
    <div className="typing-shadow"></div>
    <div className="typing-shadow"></div>
    <div className="typing-shadow"></div>
  </div>
);


const Loader = () => {
  const { isLoading, isPageLoading } = useApp();
  const showLoader = isLoading || isPageLoading;

  return (
    <div
      className={cn(
        'fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background transition-opacity duration-500',
        showLoader ? 'opacity-100' : 'opacity-0 pointer-events-none'
      )}
    >
      <h1 className="font-headline text-4xl font-bold tracking-wider text-primary">
        {siteConfig.brandName}
      </h1>
      <div className="mt-8 flex flex-col items-center space-y-4">
        <TypingLoader />
        <p className="text-muted-foreground">Initializing experience...</p>
      </div>
    </div>
  );
};

export default Loader;
