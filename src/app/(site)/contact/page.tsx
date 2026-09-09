import type { Metadata } from "next";
import { Container, Note, SectionHead } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { EnquiryForm } from "@/components/enquiry-form";
import { CONTACT } from "@/lib/site";

export const metadata: Metadata = {
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
              <Reveal>
                <div className="space-y-8">
                  <div>
                    <Note className="text-fg-subtle">Email</Note>
                    <p className="mt-2 text-lg text-fg">
                      <a
                        href={CONTACT.mailto}
                        className="hover:text-brand-500 transition-colors"
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
                        className="hover:text-brand-500 transition-colors"
                      >
                        {CONTACT.phone}
                      </a>
                    </p>
                  </div>
                </div>
              </Reveal>
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
