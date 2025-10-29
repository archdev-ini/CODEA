import { BrainCircuit } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const capabilities = [
  {
    title: 'Document Intelligence',
    description:
      'Reads and extracts meaning from architectural codes, policies, and technical manuals.',
  },
  {
    title: 'Contextual Reasoning',
    description:
      'Understands geography, culture, and climate to recommend design adaptations.',
  },
  {
    title: 'Generative Design Insight',
    description:
      'Suggests design ideas, systems, or materials aligned with local conditions.',
  },
  {
    title: 'Knowledge Linking',
    description:
      'Connects regulatory, educational, and cultural datasets into unified intelligence.',
  },
  {
    title: 'Conversational Interface',
    description:
      'Empowers architects, students, and researchers to “talk” to architectural data directly.',
  },
];

export default function AidaSection() {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-12 items-start">
          <div className="md:col-span-1 sticky top-24">
            <div className="flex items-center gap-3 mb-4">
              <BrainCircuit className="h-8 w-8 text-primary" />
              <h2 className="text-2xl font-semibold text-primary tracking-tight">
                AIDA — The Core of CODEA
              </h2>
            </div>
            <p className="text-muted-foreground">
              AIDA (Architectural Intelligence Data Agent) is the heart of the
              CODEA ecosystem — an AI designed to understand, interpret, and
              generate architectural intelligence across contexts.
            </p>
          </div>
          <div className="md:col-span-2 space-y-8">
            <div>
              <h3 className="text-xl font-medium text-foreground mb-6">
                AIDA’s Capabilities
              </h3>
              <div className="space-y-6">
                {capabilities.map((item, index) => (
                  <div key={index}>
                    <h4 className="font-semibold text-foreground">
                      {item.title}
                    </h4>
                    <p className="text-muted-foreground mt-1">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <Separator />
            <div className="space-y-4">
              <p className="text-lg italic text-foreground">
                AIDA represents a leap forward — from searching for information
                to thinking with information.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
