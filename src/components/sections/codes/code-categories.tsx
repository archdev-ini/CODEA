import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Building,
  ShieldCheck,
  PersonStanding,
  Leaf,
  GalleryVertical,
  Construction,
  DoorOpen,
} from 'lucide-react';
import SpotlightCard from '@/components/ui/SpotlightCard';

const categories = [
  {
    value: 'structural',
    label: 'Structural Codes',
    icon: <Building className="h-5 w-5 mr-2" />,
    summaries: [
      { title: 'Foundations', icon: <Construction /> },
      { title: 'Wall Systems', icon: <Construction /> },
      { title: 'Roofing', icon: <DoorOpen /> },
    ],
  },
  {
    value: 'safety',
    label: 'Fire & Safety',
    icon: <ShieldCheck className="h-5 w-5 mr-2" />,
    summaries: [
        { title: 'Egress', icon: <DoorOpen /> },
        { title: 'Fire Rating', icon: <ShieldCheck /> },
        { title: 'Alarms', icon: <Building /> },
    ],
  },
  {
    value: 'accessibility',
    label: 'Accessibility',
    icon: <PersonStanding className="h-5 w-5 mr-2" />,
    summaries: [
        { title: 'Ramps & Access', icon: <PersonStanding /> },
        { title: 'Sanitary', icon: <Building /> },
        { title: 'Signage', icon: <Construction /> },
    ],
  },
  {
    value: 'environmental',
    label: 'Environmental',
    icon: <Leaf className="h-5 w-5 mr-2" />,
    summaries: [
        { title: 'Ventilation', icon: <Building /> },
        { title: 'Water Runoff', icon: <Leaf /> },
        { title: 'Insulation', icon: <Construction /> },
    ],
  },
  {
    value: 'cultural',
    label: 'Cultural Guidelines',
    icon: <GalleryVertical className="h-5 w-5 mr-2" />,
    summaries: [
        { title: 'Vernacular Forms', icon: <GalleryVertical /> },
        { title: 'Courtyards', icon: <Building /> },
        { title: 'Public Space', icon: <PersonStanding /> },
    ],
  },
];

export default function CodeCategories() {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        <Tabs defaultValue="structural" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 h-auto">
            {categories.map((cat) => (
              <TabsTrigger key={cat.value} value={cat.value} className='py-2 data-[state=active]:shadow-lg'>
                {cat.icon} {cat.label}
              </TabsTrigger>
            ))}
          </TabsList>
          {categories.map((cat) => (
            <TabsContent key={cat.value} value={cat.value}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                {cat.summaries.map((summary) => (
                  <SpotlightCard key={summary.title}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        {summary.title}
                      </CardTitle>
                      <div className="text-muted-foreground">{summary.icon}</div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-xs text-muted-foreground">
                        View standards for {summary.title.toLowerCase()}
                      </p>
                    </CardContent>
                  </SpotlightCard>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}
