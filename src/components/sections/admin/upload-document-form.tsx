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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Loader2, UploadCloud } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const uploadSchema = z.object({
  title: z.string().min(3, 'Title is required.'),
  tags: z.string().optional(),
  file: z
    .any()
    .refine((files) => files?.length == 1, 'File is required.')
    .refine(
      (files) => ['application/pdf', 'text/plain', 'text/markdown'].includes(files?.[0]?.type),
      'Only .pdf, .txt, and .md files are accepted.'
    ),
});

type UploadFormValues = z.infer<typeof uploadSchema>;

export default function UploadDocumentForm() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [fileName, setFileName] = useState('');

  const form = useForm<UploadFormValues>({
    resolver: zodResolver(uploadSchema),
  });

  const fileRef = form.register('file');

  async function onSubmit(data: UploadFormValues) {
    setIsLoading(true);
    // Placeholder for AI extraction logic
    console.log('Form data:', data);
    await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate AI processing
    setIsLoading(false);
    
    toast({
      title: 'Processing Started',
      description: `The document "${data.file[0].name}" is being processed by the AI.`,
    });
    
    form.reset();
    setFileName('');
  }

  return (
    <Card className="max-w-xl mx-auto">
      <CardHeader>
        <CardTitle>Upload Code Document</CardTitle>
        <CardDescription>
          Upload a document (.pdf, .txt, .md) to be processed by the AI.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Document Title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Lagos State Urban and Regional Planning Law" {...field} />
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
                    <Input placeholder="e.g., zoning, permits, residential" {...field} />
                  </FormControl>
                   <FormDescription>
                    Comma-separated list of keywords.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
                control={form.control}
                name="file"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Source Document</FormLabel>
                    <FormControl>
                      <div className="mt-2 flex justify-center rounded-lg border border-dashed border-input px-6 py-10">
                        <div className="text-center">
                          <UploadCloud className="mx-auto h-12 w-12 text-muted-foreground" />
                          <div className="mt-4 flex text-sm leading-6 text-muted-foreground">
                            <label
                              htmlFor="file-upload"
                              className="relative cursor-pointer rounded-md font-semibold text-primary focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 hover:text-primary/80"
                            >
                              <span>Upload a file</span>
                              <input
                                id="file-upload"
                                type="file"
                                className="sr-only"
                                {...fileRef}
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    setFileName(file.name);
                                    field.onChange(e.target.files);
                                  }
                                }}
                              />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                          </div>
                          <p className="text-xs leading-5 text-muted-foreground">
                            PDF, TXT, MD up to 10MB
                          </p>
                        </div>
                      </div>
                    </FormControl>
                    {fileName && <FormDescription className="pt-2">Selected file: {fileName}</FormDescription>}
                    <FormMessage />
                  </FormItem>
                )}
              />

            <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Uploading & Processing...
                </>
              ) : (
                'Upload and Process Document'
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
