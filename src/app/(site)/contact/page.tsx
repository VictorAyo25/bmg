import type { Metadata } from "next";
import { Container, Note, SectionHead } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { EnquiryForm } from "@/components/enquiry-form";
import { CONTACT } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/contact" },
  title: "Contact",
  description: "Get in touch with an engineer.",
};

export default function ContactPage() {
  return (
    <>
      <section className="surface-dark panel-dark bg-mid">
        <Container className="py-20 sm:py-28">
          <Reveal>
            <SectionHead
              label="Contact"
              title="Every message here is read and answered by an engineer."
            />
          </Reveal>
        </Container>
      </section>

      <section className="panel-section">
        <Container className="py-20 sm:py-28">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-32">
                <Reveal>
                  <div className="space-y-8">
                    <div>
                      <p className="text-[1.5rem] leading-snug font-bold tracking-[-0.022em] text-balance sm:text-[1.875rem]">
                        Send the scope, the drawings, or just the problem you
                        cannot solve.
                      </p>
                      <p className="mt-5 leading-relaxed text-fg-muted">
                        You do not need a finished brief. Most useful enquiries
                        start as a question about whether something is possible.
                      </p>
                    </div>
                    <div>
                      <Note className="text-fg-subtle">Email</Note>
                      <p className="mt-2 text-lg text-fg">
                        <a
                          href={CONTACT.mailto}
                          className="inline-flex min-h-11 items-center break-all transition-colors hover:text-brand-500"
                        >
                          {CONTACT.email}
                        </a>
                      </p>
                    </div>
                    <div>
                      <Note className="text-fg-subtle">Telephone</Note>
                      <p className="mt-2 text-lg text-fg">
                        <a
                          href={CONTACT.tel}
                          className="inline-flex min-h-11 items-center break-all transition-colors hover:text-brand-500"
                        >
                          {CONTACT.phone}
                        </a>
                      </p>
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>

            <div className="lg:col-span-7">
              <Reveal delay={100}>
                <EnquiryForm />
              </Reveal>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
