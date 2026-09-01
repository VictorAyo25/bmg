import type { Metadata } from "next";
import { Container, Note, PageHero } from "@/components/ui";
import { PHOTO_CREDITS } from "@/lib/credits";

export const metadata: Metadata = {
  title: "Image credits",
  description:
    "Attribution for the photographs used as background imagery on this site.",
  robots: { index: false, follow: true },
};

export default function CreditsPage() {
  return (
    <>
      <PageHero
        label="Attribution"
        title="Image credits."
        lead="The background photographs on this site are licensed from open collections and are used as atmosphere. They do not depict BMG projects."
      />

      <section>
        <Container className="py-16 sm:py-24">
          <ul className="max-w-4xl">
            {PHOTO_CREDITS.map((c) => (
              <li
                key={c.page}
                className="grid gap-3 border-t border-white/12 py-6 last:border-b sm:grid-cols-12 sm:gap-6"
              >
                <Note className="pt-1.5 text-sky sm:col-span-2">{c.page}</Note>
                <div className="sm:col-span-10">
                  <a
                    href={c.source}
                    rel="noopener noreferrer"
                    target="_blank"
                    className="font-semibold underline underline-offset-4 hover:text-sky"
                  >
                    {c.title}
                  </a>
                  <p className="mt-2 text-sm text-white/65">
                    By {c.author}, licensed under{" "}
                    <a
                      href={c.licenceUrl}
                      rel="noopener noreferrer license"
                      target="_blank"
                      className="underline underline-offset-4 hover:text-sky"
                    >
                      {c.licence}
                    </a>
                    . Recoloured and cropped for this site.
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <p className="mt-10 max-w-2xl text-sm leading-relaxed text-white/55">
            Images licensed under a share alike licence remain available under
            the same terms in their modified form. The technical drawings
            elsewhere on this site are original work by BMG Engineering Limited.
          </p>
        </Container>
      </section>
    </>
  );
}
