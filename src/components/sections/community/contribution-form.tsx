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
import { Loader2, Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import SpotlightCard from '@/components/ui/SpotlightCard';
import { useFirestore, useUser } from '@/firebase';
import { collection, addDoc } from 'firebase/firestore';

const contributionSchema = z.object({
  type: z.enum(['insight', 'request']),
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  tags: z.string().optional(),
});

type ContributionFormValues = z.infer<typeof contributionSchema>;

export default function ContributionForm() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const firestore = useFirestore();
  const { user } = useUser();

  const form = useForm<ContributionFormValues>({
    resolver: zodResolver(contributionSchema),
    defaultValues: {
      type: 'insight',
      title: '',
      description: '',
      tags: '',
    },
  });

  async function onSubmit(data: ContributionFormValues) {
    if (!user) {
      toast({
        variant: 'destructive',
        title: 'Authentication Required',
        description: 'You must be signed in to submit a contribution.',
      });
      return;
    }

    setIsLoading(true);
    try {
      const collectionName = data.type === 'insight' ? 'insights' : 'requests';
      const collectionRef = collection(firestore, collectionName);

      await addDoc(collectionRef, {
        ...data,
        tags: data.tags ? data.tags.split(',').map((t) => t.trim()) : [],
        submittedBy: user.uid,
        submittedAt: new Date().toISOString(),
        status: 'pending',
      });

      toast({
        title: 'Contribution Submitted',
        description: 'Thank you! Your contribution is pending review.',
      });
      form.reset();
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Submission Failed',
        description:
          error.message ||
          'An error occurred while submitting your contribution.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        <SpotlightCard className="max-w-3xl mx-auto bg-card">
          <CardHeader>
            <CardTitle>Submit an Insight or Request</CardTitle>
            <CardDescription>
              Help expand the CODEA library by sharing knowledge or requesting
              new information.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contribution Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="insight">
                            Submit an Insight
                          </SelectItem>
                          <SelectItem value="request">
                            Request Information
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., Yoruba Courtyard Housing Principles"
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
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Provide a detailed description of the insight or the information you are requesting..."
                          rows={5}
                          {...field}
                        />
                      </FormControl>
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
                          placeholder="e.g., vernacular, residential, nigeria"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Comma-separated list of keywords.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

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
                    'Submit for Review'
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
