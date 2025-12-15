'use client';

import { useApp } from '@/hooks/use-app';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

const SearchBar = () => {
  const { setSearchQuery } = useApp();

  return (
    <div className="bg-background py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative max-w-xl mx-auto">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search products by name or description..."
            className="w-full bg-background/50 pl-12 pr-4 py-6 rounded-full border-2 focus-visible:ring-primary/50 text-base"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
