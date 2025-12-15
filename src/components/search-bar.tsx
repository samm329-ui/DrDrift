'use client';

import { useApp } from '@/hooks/use-app';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

const SearchBar = () => {
  const { setSearchQuery } = useApp();

  return (
    <div className="relative w-full max-w-xs">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Search products..."
        className="w-full bg-background/80 text-foreground placeholder:text-muted-foreground pl-9 pr-3 py-2 rounded-full border-2 border-transparent focus-visible:ring-primary/50 text-sm"
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
