"use client";

import React from 'react';
import { Category } from '@/types';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const categories: Category[] = [
  'Faith', 'Love', 'Despair', 'Anger', 'Hope', 'Wisdom', 'Truth',
  'Joy', 'Peace', 'Fear', 'Guilt', 'Justice', 'Mercy',
  'Kindness', 'Longsuffering', 'Patience', 'Goodness', 'Faithfulness'
];

interface CategoryPillsProps {
  selectedCategory: Category | 'All';
  onSelect: (category: Category | 'All') => void;
}

const CategoryPills = ({ selectedCategory, onSelect }: CategoryPillsProps) => {
  return (
    <div className="flex gap-3 overflow-x-auto py-2 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
      <Button
        variant="ghost"
        onClick={() => onSelect('All')}
        className={cn(
          "rounded-full px-6 py-2 h-auto text-xs font-black uppercase tracking-widest transition-all duration-300",
          selectedCategory === 'All' 
            ? "bg-primary text-white shadow-lg shadow-primary/30" 
            : "text-muted-foreground hover:text-primary hover:bg-primary/5"
        )}
      >
        All Feed
      </Button>
      {categories.map((cat) => (
        <Button
          key={cat}
          variant="ghost"
          onClick={() => onSelect(cat)}
          className={cn(
            "rounded-full px-6 py-2 h-auto text-xs font-black uppercase tracking-widest transition-all duration-300 whitespace-nowrap",
            selectedCategory === cat 
              ? "bg-primary text-white shadow-lg shadow-primary/30" 
              : "text-muted-foreground hover:text-primary hover:bg-primary/5"
          )}
        >
          {cat}
        </Button>
      ))}
    </div>
  );
};

export default CategoryPills;