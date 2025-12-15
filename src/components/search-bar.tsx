'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useApp } from '@/hooks/use-app';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import Image from 'next/image';

const SearchBar = () => {
  const { filteredProducts, searchQuery, setSearchQuery } = useApp();
  const router = useRouter();
  const [isFocused, setIsFocused] = useState(false);

  const showSuggestions = isFocused && searchQuery.length > 0;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (filteredProducts.length > 0) {
      const firstProduct = filteredProducts[0];
      router.push(`/products/${firstProduct.slug}`);
      setSearchQuery('');
      setIsFocused(false);
    }
  };

  const handleSuggestionClick = () => {
    setSearchQuery('');
    setIsFocused(false);
  }

  return (
    <form onSubmit={handleSearchSubmit} className="relative w-full">
      <div className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground z-10">
        <Search />
      </div>
      <Input
        type="search"
        placeholder="Search products..."
        className="w-full bg-background/80 text-foreground placeholder:text-muted-foreground pl-9 pr-3 py-2 border-2 border-transparent focus-visible:ring-primary/50 text-sm h-12"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setTimeout(() => setIsFocused(false), 150)}
      />
      {showSuggestions && (
        <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-background border border-border rounded-md shadow-lg max-h-96 overflow-y-auto">
          {filteredProducts.length > 0 ? (
            <ul>
              {filteredProducts.map((product) => (
                <li key={product.id}>
                  <Link
                    href={`/products/${product.slug}`}
                    onClick={handleSuggestionClick}
                    className="flex items-center gap-4 p-3 hover:bg-accent transition-colors"
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
                  </Link>
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