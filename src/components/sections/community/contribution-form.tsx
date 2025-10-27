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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import SpotlightCard from '@/components/ui/SpotlightCard';
import { collection, query, addDoc } from 'firebase/firestore';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';

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

const requestSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
});

type ContributionFormValues = z.infer<typeof contributionSchema>;
type RequestFormValues = z.infer<typeof requestSchema>;

type Jurisdiction = {
  id: string;
  name: string;
};

function RequestJurisdictionDialog() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const firestore = useFirestore();

  const requestForm = useForm<RequestFormValues>({
    resolver: zodResolver(requestSchema),
    defaultValues: { name: '' },
  });

  async function handleRequestSubmit(data: RequestFormValues) {
    setIsLoading(true);
    try {
      const requestsCol = collection(firestore, 'requests');
      await addDoc(requestsCol, {
        ...data,
        status: 'PENDING',
        createdAt: new Date().toISOString(),
      });

      toast({
        title: 'Request Submitted',
        description: `Thank you for requesting "${data.name}". It will be reviewed shortly.`,
      });
      requestForm.reset();
      setIsOpen(false);
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Request Failed',
        description: error.message || 'An unexpected error occurred.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="link" className="text-sm h-auto p-0">
          Don't see your region? Request it.
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Request a New Jurisdiction</DialogTitle>
          <DialogDescription>
            If a country or region is missing, please request it below. We'll
            review and add it to the platform.
          </DialogDescription>
        </DialogHeader>
        <Form {...requestForm}>
          <form
            id="request-jurisdiction-form"
            onSubmit={requestForm.handleSubmit(handleRequestSubmit)}
            className="space-y-4"
          >
            <FormField
              control={requestForm.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Jurisdiction Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Ghana, Addis Ababa" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button
            type="submit"
            form="request-jurisdiction-form"
            disabled={isLoading}
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Submit Request
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

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
    try {
      const { country, tags, ...rest } = data;
      const insightsCol = collection(firestore, 'insights');
      await addDoc(insightsCol, {
        ...rest,
        jurisdictionId: country, // Remapping country to jurisdictionId
        tags: tags ? tags.split(',').map((tag) => tag.trim()) : [],
        createdAt: new Date().toISOString(),
        status: 'PENDING',
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
                        <FormDescription className="flex justify-end">
                           <RequestJurisdictionDialog />
                        </FormDescription>
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
                            </Trigger>
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
