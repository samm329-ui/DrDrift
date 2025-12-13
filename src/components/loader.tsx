'use client';
import { useApp } from '@/hooks/use-app';
import { siteConfig } from '@/lib/config';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

const Loader = () => {
  const { isLoading } = useApp();

  return (
    <div
      className={cn(
        'fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background transition-opacity duration-500',
        isLoading ? 'opacity-100' : 'opacity-0 pointer-events-none'
      )}
    >
      <h1 className="font-headline text-4xl font-bold tracking-wider text-primary">
        {siteConfig.brandName}
      </h1>
      <div className="mt-8 flex items-center space-x-2">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
        <p className="text-muted-foreground">Initializing experience...</p>
      </div>
    </div>
  );
};

export default Loader;
