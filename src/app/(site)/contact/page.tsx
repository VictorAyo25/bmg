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
      <section className="bg-mid border-b border-white/12">
        <Container className="py-20 sm:py-28">
          <Reveal>
            <SectionHead
              label="Contact"
              title="An engineer will read it, and an engineer will reply."
            />
          </Reveal>
        </Container>
      </section>

      <section>
        <Container className="py-20 sm:py-28">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-5">
              <Reveal>
                <div className="space-y-8">
                  <div>
                    <Note className="text-white/70">Email</Note>
                    <p className="mt-2 text-lg text-white">
                      <a
                        href={CONTACT.mailto}
                        className="hover:text-brand-500 transition-colors"
                      >
                        {CONTACT.email}
                      </a>
                    </p>
                  </div>
                  <div>
                    <Note className="text-white/70">Telephone</Note>
                    <p className="mt-2 text-lg text-white">
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
