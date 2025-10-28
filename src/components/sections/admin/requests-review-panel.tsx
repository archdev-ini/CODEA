'use client';

import { useState } from 'react';
import { collection, query, where, doc, runTransaction, updateDoc } from 'firebase/firestore';
import { useCollection, useFirestore, useMemoFirebase, useUser } from '@/firebase';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Check, Loader2, Terminal, X } from 'lucide-react';
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
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

type JurisdictionRequest = {
  id: string;
  name: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
};

type ApproveDialogProps = {
  request: JurisdictionRequest;
  onAction: (
    id: string,
    action: 'APPROVE' | 'REJECT',
    data?: { name: string; level: string }
  ) => void;
  isLoading: boolean;
};

function ApproveDialog({ request, onAction, isLoading }: ApproveDialogProps) {
  const [level, setLevel] = useState('');
  const [name, setName] = useState(request.name);
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = () => {
    if (name && level) {
      onAction(request.id, 'APPROVE', { name, level });
      setIsOpen(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="sm" disabled={isLoading}>
          {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
          <span className="ml-2">Approve</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Approve Jurisdiction: {request.name}</DialogTitle>
          <DialogDescription>
            Confirm the name and select the level to add this jurisdiction.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Input value={name} onChange={(e) => setName(e.target.value)} />
          <Select onValueChange={setLevel} value={level}>
            <SelectTrigger>
              <SelectValue placeholder="Select a level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="NATIONAL">NATIONAL</SelectItem>
              <SelectItem value="STATE_PROVINCIAL">STATE / PROVINCIAL</SelectItem>
              <SelectItem value="CITY_MUNICIPAL">CITY / MUNICIPAL</SelectItem>
              <SelectItem value="INDIGENOUS">INDIGENOUS</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={handleSubmit} disabled={!name || !level || isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Confirm and Add
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default function RequestsReviewPanel() {
  const { toast } = useToast();
  const firestore = useFirestore();
  const { user } = useUser();
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({});

  const requestsQuery = useMemoFirebase(
    () =>
      user && !user.isAnonymous
        ? query(
            collection(firestore, 'requests'),
            where('status', '==', 'PENDING')
          )
        : null,
    [firestore, user]
  );

  const { data: requests, isLoading, error } = useCollection<JurisdictionRequest>(requestsQuery);

  const handleAction = async (
    id: string,
    action: 'APPROVE' | 'REJECT',
    jurisdictionData?: { name: string; level: string }
  ) => {
    setLoadingStates((prev) => ({ ...prev, [id]: true }));
    try {
      const requestRef = doc(firestore, 'requests', id);

      if (action === 'APPROVE') {
        if (!jurisdictionData) {
          throw new Error('Jurisdiction data is required for approval.');
        }
        await runTransaction(firestore, async (transaction) => {
          const newJurisdictionRef = doc(collection(firestore, 'jurisdictions'));
          transaction.set(newJurisdictionRef, {
            ...jurisdictionData,
            articleCount: 0,
          });
          transaction.update(requestRef, { status: 'APPROVED' });
        });
      } else { // REJECT
        await updateDoc(requestRef, { status: 'REJECTED' });
      }

      toast({
        title: `Request ${action.toLowerCase()}`,
        description: `The request has been processed.`,
      });
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Action Failed',
        description: error.message || 'An unexpected error occurred.',
      });
    } finally {
      setLoadingStates((prev) => ({ ...prev, [id]: false }));
    }
  };

  const renderContent = () => {
    if (isLoading) {
      return <Skeleton className="h-20 w-full" />;
    }

    if (error) {
      return (
        <Alert variant="destructive">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Error Loading Requests</AlertTitle>
          <AlertDescription>{error.message}</AlertDescription>
        </Alert>
      );
    }

    if (!requests || requests.length === 0) {
      return (
        <div className="text-center py-12 text-muted-foreground">
          <p>No pending jurisdiction requests to review.</p>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {requests.map((request) => (
          <Card key={request.id}>
            <CardContent className="p-4 flex items-center justify-between">
              <p className="font-medium">{request.name}</p>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleAction(request.id, 'REJECT')}
                  disabled={loadingStates[request.id]}
                >
                  {loadingStates[request.id] ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <X className="h-4 w-4" />
                  )}
                </Button>
                <ApproveDialog request={request} onAction={handleAction} isLoading={!!loadingStates[request.id]} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold tracking-tight">Review Jurisdiction Requests</h2>
        <p className="text-muted-foreground">
          Approve or reject new jurisdictions requested by the community.
        </p>
      </div>
      <div className="max-w-xl mx-auto">
        {renderContent()}
      </div>
    </div>
  );
}
