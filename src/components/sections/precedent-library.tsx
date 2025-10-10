'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { searchPrecedents } from '@/app/actions';
import { Loader2, Search, Wand2 } from 'lucide-react';

const formSchema = z.object({
  concept: z
    .string()
    .min(3, { message: 'Concept must be at least 3 characters.' }),
});

type FormValues = z.infer<typeof formSchema>;

export default function PrecedentLibrary() {
  const [results, setResults] = useState<string[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      concept: '',
    },
  });

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    setError(null);
    setResults(null);
    const response = await searchPrecedents(values);
    if (response.success && response.data) {
      setResults(response.data.results);
    } else {
      setError(response.error || 'An unknown error occurred.');
    }
    setIsLoading(false);
  }

  return (
    <section id="library" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4 font-headline">
            Explore the Precedent Library
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            Use semantic search to discover architectural concepts and
            precedents from the CODEA library. Our AI acts as a reasoning tool
            to find relevant examples.
          </p>
        </div>

        <Card className="max-w-3xl mx-auto shadow-lg">
          <CardHeader>
            <CardTitle>Semantic Precedent Search</CardTitle>
            <CardDescription>
              Enter an architectural concept like &quot;biomimicry in facade
              design&quot; or &quot;low-cost modular housing&quot;.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="concept"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Architectural Concept</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                          <Input
                            placeholder="e.g., Courtyard housing in arid climates"
                            {...field}
                            className="pl-10"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isLoading} className="w-full">
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Searching...
                    </>
                  ) : (
                    <>
                      <Wand2 className="mr-2 h-4 w-4" />
                      Search Precedents
                    </>
                  )}
                </Button>
              </form>
            </Form>

            {error && (
              <div className="mt-6 text-destructive-foreground bg-destructive/80 p-4 rounded-md">
                <p>{error}</p>
              </div>
            )}

            {results && (
              <div className="mt-8">
                <h3 className="font-semibold text-lg mb-4">
                  Search Results:
                </h3>
                {results.length > 0 ? (
                  <ul className="space-y-3 list-disc list-inside bg-card p-4 rounded-md border border-border">
                    {results.map((result, index) => (
                      <li key={index} className="text-foreground">
                        {result}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-muted-foreground">
                    No relevant precedents found. Try a different concept.
                  </p>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
