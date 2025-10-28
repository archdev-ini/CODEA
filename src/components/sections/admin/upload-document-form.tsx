
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
import { extractDocumentText } from '@/ai/flows/extract-document-text';
import { useFirestore, useUser } from '@/firebase';
import { collection, addDoc } from 'firebase/firestore';


const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ACCEPTED_FILE_TYPES = [
  'application/pdf',
  'text/plain',
  'text/markdown',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];

const uploadSchema = z.object({
  title: z.string().min(3, 'Title is required.'),
  tags: z.string().optional(),
  file: z
    .any()
    .refine((files) => files?.length == 1, 'File is required.')
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      `Max file size is 10MB.`
    )
    .refine(
      (files) => ACCEPTED_FILE_TYPES.includes(files?.[0]?.type),
      'Only .pdf, .docx, .txt, and .md files are accepted.'
    ),
});

type UploadFormValues = z.infer<typeof uploadSchema>;

// Helper to read file as text
const readFileAsText = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsText(file);
  });
};

export default function UploadDocumentForm() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [fileName, setFileName] = useState('');
  const firestore = useFirestore();
  const { user } = useUser();

  const form = useForm<UploadFormValues>({
    resolver: zodResolver(uploadSchema),
    defaultValues: {
      title: '',
      tags: '',
    },
  });

  const fileRef = form.register('file');

  async function onSubmit(data: UploadFormValues) {
    if (!user) {
      toast({
        variant: 'destructive',
        title: 'Authentication Error',
        description: 'You must be logged in to upload documents.',
      });
      return;
    }
    
    setIsLoading(true);
    try {
      const file = data.file[0];
      const fileContent = await readFileAsText(file);

      const aiResult = await extractDocumentText({
        documentText: fileContent,
      });

      const userTags = data.tags
        ? data.tags.split(',').map((t) => t.trim())
        : [];
      const allTags = [...new Set([...userTags, ...aiResult.tags])];

      const documentsCol = collection(firestore, 'documents');
      await addDoc(documentsCol, {
        title: data.title,
        sourceFile: file.name,
        content: aiResult.extractedText,
        summary: aiResult.summary,
        tags: allTags,
        uploadedBy: user.uid,
        createdAt: new Date().toISOString(),
      });

      toast({
        title: 'Document Processed & Saved',
        description: `"${data.title}" is now available in the library.`,
      });
      form.reset();
      setFileName('');

    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Processing Failed',
        description:
          error.message ||
          'An error occurred while processing the document.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="max-w-xl mx-auto">
      <CardHeader>
        <CardTitle>Upload Code Document</CardTitle>
        <CardDescription>
          Upload a document (.pdf, .docx, .txt, .md) to be processed by the AI.
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
                    <Input
                      placeholder="e.g., Lagos State Urban and Regional Planning Law"
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
                      placeholder="e.g., zoning, permits, residential"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Comma-separated list of keywords. The AI will add more.
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
                          PDF, DOCX, TXT, MD up to 10MB
                        </p>
                      </div>
                    </div>
                  </FormControl>
                  {fileName && (
                    <FormDescription className="pt-2">
                      Selected file: {fileName}
                    </FormDescription>
                  )}
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
