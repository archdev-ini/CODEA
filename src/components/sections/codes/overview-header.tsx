'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Sparkles, Globe } from 'lucide-react';
import type { SupportedCountry } from '@/app/codes/page';

type OverviewHeaderProps = {
  onSearch: (question: string) => void;
  isSearching: boolean;
  selectedCountry: SupportedCountry;
  onCountryChange: (country: SupportedCountry) => void;
};

export default function OverviewHeader({
  onSearch,
  isSearching,
  selectedCountry,
  onCountryChange,
}: OverviewHeaderProps) {
  const [question, setQuestion] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(question);
  };

  return (
    <section className="py-20 md:py-32 bg-card border-b">
      <div className="container mx-auto px-4 text-center">
        <blockquote className="text-3xl md:text-4xl font-medium text-primary mb-4">
          “Pan-African Code Library”
        </blockquote>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
          A unified repository of building regulations and standards, powered by
          AI. Ask a question to get started.
        </p>
        <div className="max-w-xl mx-auto space-y-4">
          <div className="flex justify-center">
            <Select
              value={selectedCountry}
              onValueChange={(value) => onCountryChange(value as SupportedCountry)}
            >
              <SelectTrigger className="w-[240px]">
                <Globe className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Select a country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="nigeria">Nigeria</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <form onSubmit={handleSubmit} className="relative flex gap-2">
            <Sparkles className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="e.g., What is the minimum ceiling height for a habitable room?"
              className="w-full pl-12 h-12 text-base"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              disabled={isSearching}
            />
            <Button type="submit" size="lg" disabled={isSearching}>
              Ask
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}