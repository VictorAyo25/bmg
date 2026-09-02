import type { Metadata } from "next";
import { Container, Note, SectionHead } from "@/components/ui";
import { Reveal } from "@/components/reveal";
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
              lead="Write to us and you will get an answer from somebody who can actually help."
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
                    <Note className="text-white/45">Email</Note>
                    <p className="mt-2 text-lg text-white">
                      <a href={CONTACT.mailto} className="hover:text-brand-500 transition-colors">{CONTACT.email}</a>
                    </p>
                  </div>
                  <div>
                    <Note className="text-white/45">Telephone</Note>
                    <p className="mt-2 text-lg text-white">
                      <a href={CONTACT.tel} className="hover:text-brand-500 transition-colors">{CONTACT.phone}</a>
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-7">
              <Reveal delay={100}>
                <form className="grid gap-6">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="block text-sm font-semibold text-white/70">Name</label>
                      <input type="text" id="name" name="name" required className="mt-2 w-full border border-white/20 bg-deep px-4 py-3 text-white placeholder:text-white/30 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500" placeholder="Amaka Nwosu" />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-white/70">Email</label>
                      <input type="email" id="email" name="email" required className="mt-2 w-full border border-white/20 bg-deep px-4 py-3 text-white placeholder:text-white/30 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500" placeholder="amaka@example.com" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-semibold text-white/70">Subject</label>
                    <input type="text" id="subject" name="subject" required className="mt-2 w-full border border-white/20 bg-deep px-4 py-3 text-white placeholder:text-white/30 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500" placeholder="Project enquiry" />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-white/70">Message</label>
                    <textarea id="message" name="message" rows={5} required className="mt-2 w-full resize-y border border-white/20 bg-deep px-4 py-3 text-white placeholder:text-white/30 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500" placeholder="How can we help?"></textarea>
                  </div>
                  <button type="submit" className="w-fit bg-brand-600 px-7 py-4 text-sm font-semibold text-white transition-colors hover:bg-brand-700">
                    Send message
                  </button>
                </form>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

