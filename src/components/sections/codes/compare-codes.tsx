import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function CompareCodes() {
  return (
    <section className="py-20 md:py-28 bg-card border-y">
      <div className="container mx-auto px-4">
        <Card className="max-w-4xl mx-auto shadow-lg">
          <CardHeader>
            <CardTitle>Compare Codes (Beta)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Compare..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="nigeria">Nigeria</SelectItem>
                  <SelectItem value="ghana">Ghana</SelectItem>
                  <SelectItem value="egypt">Egypt</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="vs..." />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="kenya">Kenya</SelectItem>
                    <SelectItem value="south-africa">South Africa</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Category..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fire-safety">Fire Safety</SelectItem>
                  <SelectItem value="structural">Structural</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="border rounded-md">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Criteria</TableHead>
                            <TableHead>Nigeria</TableHead>
                            <TableHead>Kenya</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell className='font-medium'>Max Story Height</TableCell>
                            <TableCell>12 floors (40m)</TableCell>
                            <TableCell>10 floors (33m)</TableCell>
                        </TableRow>
                         <TableRow>
                            <TableCell className='font-medium'>Min. Evacuation Width</TableCell>
                            <TableCell>1.2m per 100 persons</TableCell>
                            <TableCell>1.1m per 100 persons</TableCell>
                        </TableRow>
                         <TableRow>
                            <TableCell className='font-medium'>Sprinkler Requirement</TableCell>
                            <TableCell>Above 8 floors</TableCell>
                            <TableCell>Above 6 floors</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
