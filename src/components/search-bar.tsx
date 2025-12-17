
'use client';

import { useState, useEffect } from 'react';
import { useApp } from '@/hooks/use-app';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import Image from 'next/image';
import type { SiteProduct } from '@/types';
import { cn } from '@/lib/utils';

const SearchBar = () => {
  const { filteredProducts, searchQuery, setSearchQuery } = useApp();
  const [isFocused, setIsFocused] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  useEffect(() => {
    setActiveIndex(-1);
  }, [searchQuery]);

  const handleScrollToProduct = (slug: string) => {
    const element = document.getElementById(`product-card-${slug}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    setIsFocused(false);
  };

  const handleSuggestionClick = (product: SiteProduct) => {
    setSearchQuery(product.name);
    handleScrollToProduct(product.slug);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (filteredProducts.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((prevIndex) => (prevIndex + 1) % filteredProducts.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((prevIndex) => (prevIndex - 1 + filteredProducts.length) % filteredProducts.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (activeIndex > -1 && filteredProducts[activeIndex]) {
        handleSuggestionClick(filteredProducts[activeIndex]);
      } else if (filteredProducts.length > 0) {
        handleSuggestionClick(filteredProducts[0]);
      }
    }
  };

  const showSuggestions = isFocused && searchQuery.length > 0;

  return (
    <form onSubmit={(e) => e.preventDefault()} className="relative w-full max-w-md mx-auto">
      <div className="flex items-center w-full bg-background/80 dark:bg-background/60 rounded-lg overflow-hidden backdrop-blur-sm border ring-1 shadow-xl shadow-black/5 ring-border">
        <Search className="h-5 w-5 mx-3 text-muted-foreground" />
        <Input
            type="search"
            placeholder="Search products..."
            className="w-full bg-transparent text-foreground placeholder:text-muted-foreground border-0 focus-visible:ring-0 focus-visible:ring-offset-0 h-10 text-base !p-0"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 200)}
            onKeyDown={handleKeyDown}
            autoComplete="off"
        />
      </div>
      {showSuggestions && (
        <div className="absolute top-full mt-2 w-full text-sm rounded-lg bg-background text-foreground ring-1 shadow-xl shadow-black/5 ring-border">
          <div className="border-t border-border px-3.5 py-3">
             {filteredProducts.length > 0 ? (
                <ul className="flex flex-col gap-1">
                  {filteredProducts.map((product, index) => (
                    <li key={product.id}>
                      <button
                        type="button"
                        onClick={() => handleSuggestionClick(product)}
                        onMouseEnter={() => setActiveIndex(index)}
                        className={cn(
                            "group flex items-center rounded-md p-1.5 hover:bg-primary hover:text-primary-foreground w-full text-left",
                            index === activeIndex && "bg-primary text-primary-foreground"
                        )}
                      >
                        <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-md mr-2.5">
                            <Image
                                src={product.imageUrls[0]}
                                alt={product.name}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="flex-grow">
                          <p className="font-semibold">{product.name}</p>
                          <p className={cn("text-xs text-muted-foreground group-hover:text-primary-foreground/80", index === activeIndex && "text-primary-foreground/80")}>
                            {product.description}
                          </p>
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="p-4 text-center text-sm text-muted-foreground">
                  No products found for &quot;{searchQuery}&quot;
                </div>
              )}
          </div>
        </div>
      )}
    </form>
  );
};

export default SearchBar;
