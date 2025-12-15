'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
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
  const router = useRouter();

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
    <form onSubmit={(e) => e.preventDefault()} className="relative w-full">
      <div className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground z-10">
        <Search />
      </div>
      <Input
        type="search"
        placeholder="Search products..."
        className="w-full bg-background/50 text-foreground placeholder:text-muted-foreground pl-9 pr-3 py-2 border-2 border-transparent focus-visible:ring-primary/50 text-sm h-10"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setTimeout(() => setIsFocused(false), 200)}
        onKeyDown={handleKeyDown}
        autoComplete="off"
      />
      {showSuggestions && (
        <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-background border border-border rounded-md shadow-lg max-h-96 overflow-y-auto">
          {filteredProducts.length > 0 ? (
            <ul>
              {filteredProducts.map((product, index) => (
                <li key={product.id}>
                  <button
                    type="button"
                    onClick={() => handleSuggestionClick(product)}
                    onMouseEnter={() => setActiveIndex(index)}
                    className={cn(
                        "flex items-center gap-4 p-3 hover:bg-accent transition-colors w-full text-left",
                        index === activeIndex && "bg-accent"
                    )}
                  >
                    <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-md">
                        <Image
                            src={product.imageUrls[0]}
                            alt={product.name}
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div>
                        <p className="font-semibold text-sm text-foreground">{product.name}</p>
                        <p className="text-xs text-muted-foreground line-clamp-2">{product.description}</p>
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
      )}
    </form>
  );
};

export default SearchBar;
