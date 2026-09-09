# BMG website, design decisions

The standing record of what was decided and why. Read this before changing
anything visual or reopening a settled question. Where a decision has a reason
attached, the reason is the important half.

## The business, in one line

BMG Engineering Limited designs mechanical, electrical and plumbing systems,
and trains the engineers who design them. **BMG does not install.** Every
decision below follows from that.

## Positioning

Training leads. It is the strength the business is built around, and the rest
supports it. This changed mid project, so anything written before 5 August 2026
that treats training as a side branch is stale.

BMG cannot compete on installed project counts or years in business. Dephy
lists 25 completed projects and a 2015 founding date. Going head to head there
is a losing comparison, and it is why "Projects delivered" was removed from the
site. It is a contracting term meaning physical installation. BMG has installed
nothing.

## Brand

| | |
|---|---|
| Blue | `#097CCD`, sampled from the logo artwork |
| Grey | `#808080`, sampled from the logo artwork |
| Tagline | Creating your vision, one design at a time. |
| RC | 9085536 |

Earlier navy values eyeballed off the flyers were wrong. Vectors were traced
from the raster logos and live in `brand/`.

**Blue was the substrate. It is not any more.** This rule was reversed on
9 September 2026 and the history matters, because it was reversed slowly and
expensively.

The original reasoning: the flyers use deep navy fields, bright blue panels and
white cards floating on blue, and three early attempts failed review for being
white, cream or black pages with a blue trim. So the site was built blue.

What that missed is that **flyers are print**. A flyer is glanced at once. A
website is read. The client then supplied two references, marandmor.com and a
Seaport Mechanical reel, and both are light dominant with blue as the accent.
Sampling every frame of that reel gave mean luminance 151 to 241, **14 light
frames and zero dark ones**.

This is why three separate attempts to add white kept reading as bolted on.
White was being sprinkled onto an inverted base. The problem was never the
amount of white, it was which colour was the ground.

**Now: light ground, blue as accent and punctuation.** `--color-page` is the
ground. Blue keeps the hero, one statement band, the closing call and the
footer. `brand-600` fills buttons and tabs. `--color-sky` carries display text
on dark.

The field has been lightened twice at the client's request, ending at
`--color-deep` `#103a6f` and `--color-mid` `#17529c`, from `#062147` and
`#0b3a76` originally.

**There is now an opacity floor: no text may sit below `text-white/70` on
`mid`.** That is not a style preference, it is where AA stops. Measured on
`#17529c`, white at 65 percent gives 4.26:1 and fails for normal text, while
70 percent gives 4.67:1 and passes. The second lightening therefore came with
a pass over every `text-white/*` value in the codebase, raising the scale so
nothing fell through. Input placeholders are the one deliberate exception at
55 percent, which is legal because they sit on `deep` where 55 percent gives
4.56:1, and because every input has a real label so the placeholder is
supplementary rather than the only cue.

If the field is lightened a third time, recompute before changing anything.
The tool is a few lines: relative luminance per WCAG, then compose white at
each alpha over the background and take the ratio. Do not lighten and hope.

Note that the photographs were duotoned against the older, darker navy. They
still sit correctly because the scrims are drawn from the tokens, but if the
field is lightened further the images should be regraded to match.

On contrast: `#097CCD` measures 4.48:1 on near black and 3.85:1 on warm paper,
both below the 4.5:1 needed for body text. Display type and fills use the logo
blue itself, where 3:1 applies. Small text on dark uses `sky`.

## Surfaces: blue asserts, white reads

The site was blue from top to bottom and the client reported it as relentless.
The fix was not less blue, it was giving blue something to be measured against.

The reference the client keeps citing, marandmor.com, was measured rather than
guessed at. Sampling its background luminance down the page gives: dark hero
for the first 16 percent, then **white for 43 percent**, one dark punctuation
band, white again, then a dark close. White is their reading surface. Their
brand colour is the accent on it. Dark is reserved for the hero, one band and
the footer.

**Two devices were tried and discarded before the right one.** First, full
bleed white bands: the cut from photographic blue straight into flat white is
an 11:1 luminance jump with nothing mediating it, and it read as two sites
stitched together. Second, white panels floating on a blue page: better, but it
kept blue as the ground, which the references say is wrong.

**What the page actually is now: a light ground carrying cards.** Some cards
are white, some are dark blue. Both use the same radius, the same inset width
and the same vertical rhythm, so the page reads as one system rather than two
languages arguing. `.panel-section` is the light card, `.panel-dark` is the
dark one.

Three rules that are easy to break by accident:

- `.panel-dark` needs `overflow: hidden`. The hero fills a background image,
  and without it the image squares off the corners the radius just rounded.
- Nothing is full bleed except the sticky header and the footer. If a section
  spans edge to edge it will read as a different language from everything
  around it, which is the mistake that produced the first two attempts.
- The header is light, so the logo uses its real colours rather than `mono`.

**The rule: anything a visitor studies at length or compares goes on white.**
Curriculum, project schedules, service detail, the About narrative, the
enquiry form. Blue keeps the hero, one punctuation band per page, the close
and the footer.

Sections do not restyle their children. Everything reads from variables, so a
section becomes light by adding `surface-light` and nothing else changes.
`--fg`, `--fg-muted`, `--fg-subtle`, `--accent-c`, `--rule-c`,
`--rule-strong-c`, `--tint-c`, `--danger-c`.

Light values measured against `#ffffff`: fg `#0c2340` at 15.79:1, fg-muted
`#3a566f` at 7.66:1, fg-subtle `#5c7893` at 4.60:1, accent `#0a62a5` at 6.36:1.

**The accent differs by surface on purpose.** The logo blue `#097CCD` only
reaches 4.40:1 on white and fails for body text, so light surfaces use
brand-700 for anything small. The logo blue is still correct for large display
type, which only needs 3:1.

The home Work section also lost its background photograph. It was the third
blue tinted image in a row, and a schedule is compared row against row rather
than felt. Removing it is what lets the images that remain register at all.

## Type

Archivo for everything structural, IBM Plex Mono for the annotation layer.
Two families only. Instrument Serif and Space Grotesk were loaded while three
directions were compared and were removed with the rejected designs.

## What "does not look AI generated" means here

This was an explicit client requirement and three rounds failed it. The
diagnosis that finally held:

Avoiding the crude tells is not enough. Gradient blobs, uniform card grids,
pill buttons, `Learn more →` on every card and a four stat row are the obvious
ones. But **"minimal, near monochrome, thin hairlines, one accent, generous
whitespace" is itself the default house style** of template and AI output.
Restraint has become the tell. Moving from the obvious average to the
sophisticated average is not progress.

The antidote is committing to the client's own visual language rather than a
tasteful general one. Angled tabs, blue fields, white cards on blue, heavy
display weights, the drafting grid.

## Rejected, do not reopen without new information

- **Copying installer sites.** Dephy and Mar&Mor install. Photographs of
  installed ductwork prove their work, not BMG's. Borrow their light and dark
  rhythm, never their proof.
- **Buying `bmgengineeringlimited.com` alternatives.** The client chose the
  long form knowingly, after being shown shorter names that were available.
- **Publishing a technical drawing that has not been checked.** One wrong
  schematic in front of engineers costs more than no schematic at all.

## Where animation stands

Not rejected. The client has asked for more of it, twice. The constraints are
what matter:

- Motion must never carry meaning that the page would lose without it, because
  it is switched off entirely under `prefers-reduced-motion`.
- No abstract animated HVAC graphics. A moving diagram invites the same
  scrutiny a static one does, and a wrong one is worse for moving.
- Weight is the budget. Most visitors arrive from a WhatsApp link on mobile
  data, so animation that costs bytes has to earn them.

## Why the page is not a slide deck

The client said the pages read like a slide deck rather than a website, and
that was accurate. Worse, it was caused by an earlier fix: once every section
became a rounded card of similar height holding a heading and a list, the page
was literally a stack of slides.

**A deck is uniform bands, one idea each, same height, same padding, stacked,
nothing overlapping, nothing responding.** A page is none of those things.

So sections must differ from their neighbours on purpose. On the home page:
full bleed hero, then a thin band travelling sideways, then an asymmetric
split, then a tall quiet centred image, then a card with a sticky column, then
an interactive list, then a short numeric band, then a light close.

Three devices carry most of the difference, and none should be removed without
replacing them with something equivalent:

- **The marquee.** Everything else moves down the page. One element moving
  sideways is what stops it reading as a sequence.
- **The sticky column.** The programme heading holds while its modules scroll
  past. It is the clearest single thing a slide cannot do.
- **The project filter.** A list you can interrogate rather than scroll past.
  It also happens to be useful, since a developer only wants the commercial
  work.

Uniformity is the enemy here, not ugliness. If a new section is added, check
what its neighbours are doing and do something else.

## Motion, and why it is restrained

Every transition uses one curve, `--ease-lux`, a slow start with a long
decelerating tail. Deceleration is most of what reads as expensive.

Two things learned the hard way:

- **Never scale text in an animation.** The reveal used `scale(0.95)` and it
  rendered type on fractional pixels the whole way through, which looks soft.
  Translate only.
- **Navigation scrolls to the top instantly, not smoothly.** Smooth scrolling
  to the top of a page you have not seen means watching content you already
  read rush past, which reads as lag. The upward movement people want is the
  content settling in, which is what the enter animation does.

Durations: page enter 0.55s, scroll reveal 0.62s, hover 0.45s. Earlier values
were roughly double and felt sluggish rather than considered.

## Type scale

The reference sites run noticeably smaller display type than the first build
did. Oversized headings read as a template shouting. The hero came down from
4.75rem to 3.5rem and section headings from 3rem to 2.375rem, with leads
dropping a step so the ratios still hold.

## Content rules

- **Never name a client.** The delivered projects are anonymous. Describe the
  building, the systems and the engineering problem. Never the client, never a
  location specific enough to identify one. MCD is the first direct client and
  the only name that may ever appear, once that project is ready.
- **Never state a fee, discount or bank account.** They change, and they date
  the site the moment they do. Every enquiry route leads to a person.
- **No fixed programme duration or module count.** Favour may move to four
  months run twice a year. Duration reads "Flexible", which also pushes people
  to enquire. The weekly commitment was removed for the same reason.
- **Say "design projects", not "projects delivered".** The figure is 30, and
  the listed examples are a selection rather than the whole record.
- **No em dashes and no en dashes anywhere.** Code, copy, commit messages.
- Core services statement belongs on the **home page** landing area. Granular
  MEP detail belongs on the services page. Favour was explicit: visitors may
  not navigate deeper.

## Technical drawings

Favour rejected an earlier duct schematic because the last two components were
not connected to the ductwork. A wrong drawing shown to engineers is worse than
no drawing, so `src/components/mep-plan.tsx` carries its engineering logic in a
header comment for checking. The rules it holds to:

1. The air path is a closed loop and the return connects back to the unit.
2. Draw through arrangement: filter, then coil, then fan.
3. Supply trunk reduces after each takeoff.
4. Return trunk grows toward the unit.
5. Relief air comes off the return main upstream of the mixing box.

These are vector drawings, not Revit exports. If Favour supplies real exports
from his own models they replace this directly, and that remains the better
long term answer because it is unambiguously his own work.

## Imagery

Background photographs are original AI generated imagery. They are **atmosphere, not portfolio**.

**The rule: never caption, describe or arrange them so as to suggest they are
BMG projects.** They are not real buildings. They sit behind text at low
contrast, and each carries an empty alt attribute so screen readers treat them
as decoration, which is what they are.

Each is duotoned to the brand ramp before it ships, deep navy in the shadows
through to sky in the highlights. This ensures they read as one family and fit
the brand palette.

Because the images are original, no attribution is owed, and the credits page
was removed. The art direction and realism constraints bind any future image:

1. **Photorealistic only.** Full frame camera, wide angle, natural existing light,
   gentle vignetting, focus dropoff, sensor grain.
2. **Imperfect.** Dust, scuffed paint, uneven grime, worn, asymmetric.
3. **No text or human figures.** Generative models fail at text, and faces
   distract from the architecture.
4. **The quiet zone.** The left 45 percent of any hero or banner must be low
   detail and dark to ensure headline legibility.

Photographs are served through `next/image`, so Next produces WebP at the
right width per device. Do not convert them to CSS backgrounds, which would
ship the full JPEG to a phone.

## Still open

- **The portrait is now in**, on the About page, in a block of its own. It is
  the only genuinely real photograph on the site, so it is not buried in a
  column beside a drawing. Still needed: Favour s job title for the caption,
  which currently reads name plus company only rather than inventing one.
- **Photography.** Licensed stock is now in place as atmosphere, which closes
  the gap but does not fill it. Real project imagery, or Revit exports from
  Favour's own models, would replace it and would let the images finally carry
  captions, which is where their persuasive power actually is.
- **"Remove references to engineering."** Appeared in a meeting summary, is
  unsupported by the transcript, and contradicts the registered company name.
  Not actioned pending clarification.
- **Email.** Still a Gmail address in the footer, which undercuts a firm asking
  to design your building's systems. One line in `src/lib/site.ts`.
- **`WEB3FORMS_KEY` is not set.** Until it is, the contact form refuses and
  tells visitors to email instead. Get a key from web3forms.com against
  `bmgengineeringlimited@gmail.com`, add it in Vercel under Settings then
  Environment Variables across all three environments, then redeploy, because
  the value is read at build time and an existing deployment will not pick it
  up. See the enquiry form section below.
- **This file needs repairing.** The "Rejected, do not reopen" section was
  rewritten and is now self contradicting: it lists animated backgrounds and
  animation restraint as rejected while simultaneously describing both as the
  current strategy. One bullet also breaks off mid sentence at "Client chose
  the long", and that truncation swallowed the "Content rules" heading, so the
  rules about never naming a client, never publishing a fee, and never quoting
  a fixed programme duration now read as things that were rejected. They were
  not. They are binding. Until this is fixed, treat the bullets between the
  domain line and the "Technical drawings" heading as content rules rather
  than as rejected decisions.

## The enquiry form

Posts to `/api/enquiry`, which validates, checks a honeypot, and forwards to
Web3Forms using `WEB3FORMS_KEY` from the server environment. The key is
deliberately server side, so it cannot be lifted from the page source and
abused.

**Without the key set, the form refuses honestly and tells the visitor to
email instead.** It never reports success it has not achieved. A visitor who
believes they have reached BMG and has not is worse off than one who was told
to send an email.

The provider is the replaceable part. When the domain and a real mailbox
exist, swap the fetch in that route for Resend or similar. Nothing else on the
site changes.

## Out of scope

The school software project discussed in the same meetings is a separate
engagement with a different client. It never belongs in this repo.
