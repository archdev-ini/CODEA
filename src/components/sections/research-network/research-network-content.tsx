
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';

export default function ResearchNetworkContent() {
  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <header className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-primary tracking-tight leading-tight mb-4">
              CODEA Research Network
            </h1>
          </header>

          <article className="prose prose-invert prose-lg max-w-none mx-auto space-y-12">
            <div>
              <h2 className="text-2xl font-semibold text-primary mb-4">About the Network</h2>
              <p>
                The CODEA Research Network brings together architects, researchers, and institutions working to document and interpret Africa’s built environment. It is a growing collective focused on codes, precedents, and cultural knowledge — the foundations of an intelligent, context-aware architectural future.
              </p>
              <p>
                CODEA is not a static archive. It evolves through shared inquiry, where each new dataset strengthens the collective understanding of how climate, culture, and policy shape design across the continent.
              </p>
              <p>
                Joining the network means becoming part of a distributed research community — one that values open access, cultural authenticity, and technical precision.
              </p>
            </div>

            <Separator />

            <div>
              <h2 className="text-2xl font-semibold text-primary mb-4">Partner Institutions and Contributors</h2>
              <p>
                Our network begins with architecture schools, councils, and independent researchers across regions — from Lagos to Nairobi, Accra to Addis Ababa. Each partner contributes verified datasets, field studies, or precedents aligned with CODEA’s three pillars:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Atlas</strong> — National and regional building codes</li>
                <li><strong>Archive</strong> — Built and documented projects</li>
                <li><strong>Lexicon</strong> — Cultural and environmental intelligence</li>
              </ul>
              <p>
                Every contribution is reviewed, standardized, and published with full attribution through the CODEA Foundation.
              </p>
               <blockquote className="border-l-4 border-primary pl-4 italic text-foreground mt-6">
                “Collaboration is our infrastructure — knowledge is our common ground.”
              </blockquote>
            </div>

            <Separator />

            <div>
              <h2 className="text-2xl font-semibold text-primary mb-4">Join the Research Network</h2>
              <p>
                We welcome participation from:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Architecture and planning departments</li>
                <li>Research collectives and cultural archives</li>
                <li>Individual scholars or practitioners</li>
                <li>Policy and standards organizations</li>
              </ul>
              <p className="mt-4">
                To join, fill out the network form below. You’ll receive a contributor guide and access to CODEA’s structured templates for uploading codes, precedents, and lexicon entries.
              </p>
              <div className="mt-6">
                <Button size="lg" asChild>
                  <Link href="#">Join the Network</Link>
                </Button>
              </div>
            </div>

            <Separator />

            <div>
              <h2 className="text-2xl font-semibold text-primary mb-4">Guidelines for Dataset Contribution</h2>
              <p>
                To ensure consistency and traceability:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Use the provided dataset templates for Atlas, Archive, or Lexicon entries.</li>
                <li>Include complete metadata (region, typology, materials, climate zone, cultural tags).</li>
                <li>Cite sources or original documentation for verification.</li>
                <li>Submit images, diagrams, or drawings under open or attributed licenses.</li>
              </ul>
              <p className="mt-4">
                Contributions are reviewed and published under the CODEA Open Research License (CORL). All approved contributors are listed on the Research Network page with their affiliated institution or independent profile.
              </p>
            </div>
            
            <Separator />

            <div>
              <h2 className="text-2xl font-semibold text-primary mb-4">Calls for Papers and Collaborations</h2>
              <p>
                CODEA will periodically announce open calls for:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                  <li>Regional dataset expansion (e.g., West African Housing Codes, Sahelian Vernaculars)</li>
                  <li>Research fellowships and student-led field studies</li>
                  <li>Collaborative publications on architectural standards, culture, and environmental adaptation</li>
              </ul>
              <p className="mt-4">
                Subscribe to the CODEA newsletter to stay informed about upcoming calls and partnership opportunities.
              </p>
               <div className="mt-6">
                <Button size="lg" asChild>
                  <Link href="#">Subscribe for Updates</Link>
                </Button>
              </div>
            </div>

             <Separator />

            <div>
              <p className='text-lg'>
                The CODEA Research Network is how architectural intelligence grows — through the contributions of those who study, design, and document the built realities of Africa. Together, we are building a shared foundation where every insight strengthens the whole.
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
