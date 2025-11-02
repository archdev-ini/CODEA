import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';

export default function AboutContent() {
  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <header className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-primary tracking-tight leading-tight mb-4">
              About CODEA
            </h1>
            <p className="text-lg text-muted-foreground">
              Architectural Intelligence for a Connected World
            </p>
          </header>

          <article className="prose prose-invert prose-lg max-w-none mx-auto space-y-12">
            <div>
              <h2 className="text-2xl font-semibold text-primary mb-4">What CODEA Is</h2>
              <p>
                CODEA is a Pan-African architectural intelligence platform that
                connects building codes, design precedents, and cultural data
                into one open ecosystem. It is where architecture meets
                technology — a foundation for research, design, and education
                that honors context as a form of intelligence.
              </p>
              <p>
                Every structure begins with knowledge. CODEA transforms
                scattered archives, forgotten traditions, and fragmented
                standards into a living digital framework for architects,
                researchers, and students.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-primary mb-4">Our Purpose</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  To make context accessible — turning local culture,
                  environment, and regulation into clear, usable insight.
                </li>
                <li>
                  To help architects design with awareness, precision, and
                  empathy.
                </li>
                <li>
                  To ensure that the next generation of African design thinking
                  is documented, connected, and intelligent.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-primary mb-4">
                The Research Layer (v0)
              </h2>
              <p>
                CODEA begins with its Research Layer — a foundation built on
                knowledge and data. It brings together three core archives that
                define the future of architectural intelligence:
              </p>
              <ul className="list-decimal pl-6 mt-4 space-y-2 font-medium text-foreground">
                <li>
                  <strong>Atlas:</strong> a spatial archive of African
                  typologies, materials, and building traditions.
                </li>
                <li>
                  <strong>Lexicon:</strong> a multilingual glossary uniting
                  indigenous and technical architectural languages.
                </li>
                <li>
                  <strong>Archive:</strong> a curated repository of research,
                  drawings, and documentation from across the continent.
                </li>
              </ul>
              <p className="mt-4">
                Together, they form the backbone of AIDA, CODEA’s evolving AI —
                trained to interpret, not imitate, the intelligence within
                architectural culture.
              </p>
            </div>

            <Separator />

            <div>
              <h2 className="text-2xl font-semibold text-primary mb-4">Our Philosophy</h2>
              <blockquote className="border-l-4 border-primary pl-4 italic text-foreground">
                Architecture is both memory and imagination. To design well is
                to understand where knowledge comes from — climate, craft, and
                culture.
              </blockquote>
              <p className="mt-4">
                CODEA does not seek to automate architecture; it seeks to
                amplify understanding. By transforming cultural data into
                design intelligence, CODEA strengthens the human judgment that
                defines meaningful architecture.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-primary mb-4">A Connected Vision</h2>
              <p>
                CODEA is built for a global future rooted in local truth. It
                begins in Africa but speaks to the world — a proof that
                architecture’s most advanced intelligence is not technological,
                but cultural.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-primary mb-4">Our Partners</h2>
              <p>
                CODEA works with universities, studios, and researchers across
                the continent to collect, verify, and preserve architectural
                data. Each contribution expands the collective memory that
                fuels the platform’s intelligence.
              </p>
              <p>
                If you are an educator, researcher, or designer interested in
                contributing, join the CODEA Research Network.
              </p>
              <div className="mt-6">
                <Button size="lg" asChild>
                  <Link href="#">Join the Network</Link>
                </Button>
              </div>
            </div>

            <Separator />

            <div>
              <h2 className="text-2xl font-semibold text-primary mb-4">CODEA Foundation</h2>
              <p>
                CODEA is developed by the CODEA Foundation, a not-for-profit
                initiative of Builder Africa, dedicated to advancing
                architectural knowledge, open data, and AI-driven education
                across the Global South.
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
