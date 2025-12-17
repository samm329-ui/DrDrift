
'use client';
import { useApp } from '@/hooks/use-app';
import { siteConfig } from '@/lib/config';
import { cn } from '@/lib/utils';

const RippleLoader = () => (
    <div className="loader">
      <div className="logo absolute inset-0 flex items-center justify-center text-5xl font-extrabold font-headline tracking-widest text-primary opacity-100" style={{ textShadow: '0 0 10px hsla(var(--primary), 0.5)'}}>
        {siteConfig.brandName}
      </div>
      <div className="box" style={{'--i': 1} as React.CSSProperties}></div>
      <div className="box" style={{'--i': 2} as React.CSSProperties}></div>
      <div className="box" style={{'--i': 3} as React.CSSProperties}></div>
      <div className="box" style={{'--i': 4} as React.CSSProperties}></div>
      <div className="box" style={{'--i': 5} as React.CSSProperties}></div>
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
