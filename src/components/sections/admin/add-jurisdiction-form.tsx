'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useFirestore } from '@/firebase';
import { collection, addDoc } from 'firebase/firestore';

const jurisdictionSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  level: z.enum([
    'CONTINENTAL',
    'REGIONAL',
    'NATIONAL',
    'STATE_PROVINCIAL',
    'CITY_MUNICIPAL',
    'INDIGENOUS',
  ]),
});

type JurisdictionFormValues = z.infer<typeof jurisdictionSchema>;

export default function AddJurisdictionForm() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const firestore = useFirestore();

  const form = useForm<JurisdictionFormValues>({
    resolver: zodResolver(jurisdictionSchema),
    defaultValues: {
      name: '',
      level: 'NATIONAL',
    },
  });

  async function onSubmit(data: JurisdictionFormValues) {
    setIsLoading(true);
    try {
      const jurisdictionsCol = collection(firestore, 'jurisdictions');
      await addDoc(jurisdictionsCol, {
        ...data,
        articleCount: 0,
      });

      toast({
        title: 'Jurisdiction Added',
        description: `${data.name} has been added to the database.`,
      });
      form.reset();
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Submission Failed',
        description:
          error.message ||
          'An error occurred while adding the jurisdiction.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="max-w-xl mx-auto">
      <CardHeader>
        <CardTitle>Add New Jurisdiction</CardTitle>
        <CardDescription>
          Add a new country, state, or region to the database.
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
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Jurisdiction Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Nigeria" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="level"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Level</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a level" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.values(jurisdictionSchema.shape.level.options).map((level) => (
                          <SelectItem key={level} value={level}>
                            {level}
                          </SelectItem>
                        )
                      )}
                    </SelectContent>
                  </Select>
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
                  Adding...
                </>
              ) : (
                'Add Jurisdiction'
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
