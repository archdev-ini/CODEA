'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import SpotlightCard from '@/components/ui/SpotlightCard';
import { collection, query } from 'firebase/firestore';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { submitContribution } from '@/app/actions';

const contributionSchema = z.object({
  country: z.string().min(1, 'Country is required'),
  section: z.string().min(1, 'Section is required'),
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z
    .string()
    .min(10, 'Description must be at least 10 characters'),
  references: z.string().optional(),
  tags: z.string().optional(),
  contributorName: z.string().optional(),
  contributorEmail: z.union([z.string().email(), z.literal('')]).optional(),
});

type ContributionFormValues = z.infer<typeof contributionSchema>;

type Jurisdiction = {
  id: string;
  name: string;
};

export default function ContributionForm() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const firestore = useFirestore();

  const jurisdictionsQuery = useMemoFirebase(
    () => query(collection(firestore, 'jurisdictions')),
    [firestore]
  );
  const { data: jurisdictions } =
    useCollection<Jurisdiction>(jurisdictionsQuery);

  const form = useForm<ContributionFormValues>({
    resolver: zodResolver(contributionSchema),
    defaultValues: {
      country: '',
      section: '',
      title: '',
      description: '',
      references: '',
      tags: '',
      contributorName: '',
      contributorEmail: '',
    },
  });

  async function onSubmit(data: ContributionFormValues) {
    setIsLoading(true);
    const result = await submitContribution(data);
    setIsLoading(false);

    if (result.success) {
      toast({
        title: 'Contribution Submitted',
        description: 'Thank you! Your contribution is pending review.',
      });
      form.reset();
    } else {
      toast({
        variant: 'destructive',
        title: 'Submission Failed',
        description:
          result.error ||
          'An error occurred while submitting your contribution.',
      });
    }
  }

  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        <SpotlightCard className="max-w-3xl mx-auto bg-card">
          <CardHeader>
            <CardTitle>Submit a Contribution</CardTitle>
            <CardDescription>
              Help expand the CODEA library by submitting a code, standard, or
              design guideline.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <FormField
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Country / Region</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a country" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {jurisdictions?.map((j) => (
                              <SelectItem key={j.id} value={j.id}>
                                {j.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="section"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Section</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a section" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="structural">
                              Structural Codes
                            </SelectItem>
                            <SelectItem value="fire-safety">
                              Fire & Safety
                            </SelectItem>
                            <SelectItem value="accessibility">
                              Accessibility
                            </SelectItem>
                            <SelectItem value="environmental">
                              Environmental
                            </SelectItem>
                            <SelectItem value="cultural">
                              Cultural & Spatial
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title / Clause</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., Minimum fire escape width"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description / Standard</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Every storey with occupant load above 50 must have two exits..."
                          rows={4}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="references"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>References</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., NBC 2015 Part 4 - Fire Protection"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Optional: URL or citation for the source document.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="tags"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tags</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., egress, public buildings, safety"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Optional: Comma-separated list of keywords.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <FormField
                    control={form.control}
                    name="contributorName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Optional" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="contributorEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Optional, for updates"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    'Submit Contribution for Review'
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </SpotlightCard>
      </div>
    </section>
  );
}
