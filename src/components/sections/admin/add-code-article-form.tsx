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
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, query, runTransaction, doc, addDoc } from 'firebase/firestore';

const articleSchema = z.object({
  jurisdictionId: z.string().min(1, 'Jurisdiction is required'),
  codeId: z.string().min(3, 'Code ID must be at least 3 characters'),
  codeName: z.string().min(3, 'Code Name must be at least 3 characters'),
  version: z.string().min(4, 'Version/Year is required'),
  title: z.string().min(5, 'Title must be at least 5 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
});

type ArticleFormValues = z.infer<typeof articleSchema>;

type Jurisdiction = {
  id: string;
  name: string;
};

export default function AddCodeArticleForm() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const firestore = useFirestore();

  const jurisdictionsQuery = useMemoFirebase(
    () => query(collection(firestore, 'jurisdictions')),
    [firestore]
  );
  const { data: jurisdictions } = useCollection<Jurisdiction>(jurisdictionsQuery);

  const form = useForm<ArticleFormValues>({
    resolver: zodResolver(articleSchema),
    defaultValues: {
      jurisdictionId: '',
      codeId: '',
      codeName: '',
      version: '',
      title: '',
      description: '',
    },
  });

  async function onSubmit(data: ArticleFormValues) {
    setIsLoading(true);
    try {
      const jurisdictionRef = doc(firestore, 'jurisdictions', data.jurisdictionId);
      const articlesCol = collection(firestore, 'articles');
      
      await runTransaction(firestore, async (transaction) => {
        const jurisdictionDoc = await transaction.get(jurisdictionRef);
        if (!jurisdictionDoc.exists()) {
          throw new Error("Jurisdiction does not exist!");
        }

        // 1. Create the new article document (using addDoc equivalent inside transaction)
        const newArticleRef = doc(articlesCol);
        transaction.set(newArticleRef, data);
        
        // 2. Atomically increment the article count
        const newArticleCount = (jurisdictionDoc.data().articleCount || 0) + 1;
        transaction.update(jurisdictionRef, { articleCount: newArticleCount });
      });

      toast({
        title: 'Code Article Added',
        description: `Article "${data.title}" has been added.`,
      });
      form.reset();
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Submission Failed',
        description:
          error.message || 'An error occurred while adding the article.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="max-w-xl mx-auto">
      <CardHeader>
        <CardTitle>Add New Code Article</CardTitle>
        <CardDescription>
          Add a specific regulation, standard, or code to a jurisdiction.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="jurisdictionId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Jurisdiction</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a jurisdiction" />
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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FormField
                control={form.control}
                name="codeId"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Code ID</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., CDA-BC-NG-LAG-2025" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="version"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Version / Year</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 2025" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="codeName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Code Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., National Building Code" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Article Title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Minimum Habitable Room Height" {...field} />
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
                      placeholder="Specifies the minimum ceiling height for rooms intended for human habitation..."
                      rows={3}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Adding Article...
                </>
              ) : (
                'Add Code Article'
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
