"use client";

import React from 'react';
import { Category } from '@/types';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const categories: Category[] = [
  'Faith', 'Love', 'Despair', 'Anger', 'Hope', 'Wisdom', 'Truth',
  'Joy', 'Peace', 'Fear', 'Guilt', 'Justice', 'Mercy',
  'Kindness', 'Longsuffering', 'Patience', 'Goodness', 'Faithfulness',
  'Perseverance', 'Grief', 'Pain', 'Humble'
];

interface CategoryPillsProps {
  selectedCategory: Category | 'All';
  onSelect: (category: Category | 'All') => void;
}

const CategoryPills = ({ selectedCategory, onSelect }: CategoryPillsProps) => {
  return (
    <div className="w-full">
      <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 py-2">
        <Button
          variant="ghost"
          onClick={() => onSelect('All')}
          className={cn(
            "rounded-full px-5 py-2 h-9 text-[10px] font-black uppercase tracking-widest transition-all duration-300 border",
            selectedCategory === 'All' 
              ? "bg-primary text-white border-primary shadow-lg shadow-primary/25 scale-105" 
              : "text-muted-foreground dark:text-zinc-300 border-transparent hover:border-primary/20 hover:bg-primary/5 hover:text-primary dark:hover:text-primary"
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
              "rounded-full px-5 py-2 h-9 text-[10px] font-black uppercase tracking-widest transition-all duration-300 border whitespace-nowrap",
              selectedCategory === cat 
                ? "bg-primary text-white border-primary shadow-lg shadow-primary/25 scale-105" 
                : "text-muted-foreground dark:text-zinc-300 border-transparent hover:border-primary/20 hover:bg-primary/5 hover:text-primary dark:hover:text-primary"
            )}
          >
            {cat}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default CategoryPills;