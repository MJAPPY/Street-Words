"use client";

import React from 'react';
import { Category } from '@/types';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const categories: Category[] = ['Faith', 'Love', 'Despair', 'Anger', 'Hope', 'Wisdom', 'Truth'];

interface CategoryPillsProps {
  selectedCategory: Category | 'All';
  onSelect: (category: Category | 'All') => void;
}

const CategoryPills = ({ selectedCategory, onSelect }: CategoryPillsProps) => {
  return (
    <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide">
      <Button
        variant={selectedCategory === 'All' ? 'default' : 'outline'}
        onClick={() => onSelect('All')}
        className={cn(
          "rounded-full px-6 transition-all",
          selectedCategory === 'All' ? "bg-[#a855f7] hover:bg-[#9333ea]" : ""
        )}
      >
        All
      </Button>
      {categories.map((cat) => (
        <Button
          key={cat}
          variant={selectedCategory === cat ? 'default' : 'outline'}
          onClick={() => onSelect(cat)}
          className={cn(
            "rounded-full px-6 transition-all",
            selectedCategory === cat ? "bg-[#a855f7] hover:bg-[#9333ea]" : ""
          )}
        >
          {cat}
        </Button>
      ))}
    </div>
  );
};

export default CategoryPills;