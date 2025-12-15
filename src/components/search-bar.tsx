'use client';

import { useApp } from '@/hooks/use-app';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

const SearchBar = () => {
  const { setSearchQuery } = useApp();

  return (
    <div className="bg-background py-4 border-b">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search products..."
            className="w-full bg-background/50 pl-9"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
