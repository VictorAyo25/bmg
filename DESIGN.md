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

**Blue is the substrate, not the accent.** This is the single most important
visual rule. The flyers use deep navy fields, bright blue panels and white
cards floating on blue. Three earlier attempts failed review because they were
white, cream or black pages with a blue trim, which read as generic. The theme
tokens are `--color-deep` for the page, `--color-mid` for alternate bands,
`brand-600` for fills, `--color-sky` for display text that needs to clear
contrast on deep.

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

- **Animated abstract HVAC background graphics.** Previously rejected, but the strategy has shifted to embrace a more dynamic, modern experience. Background *images* (no longer restricted just to hero sections) combined with richer structural animations bring the site to life.

- **Animation restraint.** The strategy has shifted to include more pronounced, dynamic structural animations across the site, moving away from strict minimalism to a more engaging presentation.
- **Copying installer sites.** Dephy and Mar&Mor install. Photographs of
  installed ductwork prove their work, not BMG's.
- **Buying `bmgengineeringlimited.com` alternatives.** Client chose the long

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

- **The portrait.** Favour deferred, wanting broader feedback on the complete
  layout. Victor advised against it, on the grounds that looking young invites
  clients to judge the work by age. Favour countered that youth can sell.
  Currently shipped without.
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
