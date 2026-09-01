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

- **Animated abstract HVAC background graphics.** Requested after Favour saw
  dephy-ng.com and marandmor.com. Neither site has them. Dephy has a static
  construction photograph, Mar&Mor has a carousel of real project photography.
  What reads as "alive" on both is imagery, not animation. Abstract motion
  would be decoration that claims nothing, costs real performance on the phones
  visitors arrive on from WhatsApp, and repeats the technical accuracy risk.
- **Copying installer sites.** Dephy and Mar&Mor install. Photographs of
  installed ductwork prove their work, not BMG's.
- **Buying `bmgengineeringlimited.com` alternatives.** Client chose the long
  form knowingly after being shown shorter available options.

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

Background photographs are licensed from Wikimedia Commons, four under CC
BY-SA and one CC0. They are **atmosphere, not portfolio**.

**The rule: never caption, describe or arrange them so as to suggest they are
BMG projects.** They are other people's buildings. They sit behind text at low
contrast, and each carries an empty alt attribute so screen readers treat them
as decoration, which is what they are.

Each is duotoned to the brand ramp before it ships, deep navy in the shadows
through to sky in the highlights. That is why a green heat exchanger can sit
beside grey ductwork without clashing, and it is what stops them reading as
stock.

The CC BY-SA licences oblige us to name the author, state the licence, link to
it, and note that the image was modified. That is what the credits page is for
and why the footer links to it. **Do not remove either without first removing
the images.** The data lives in `src/lib/credits.ts`.

Photographs are served through `next/image`, so Next produces WebP at the
right width per device. Do not convert them to CSS backgrounds, which would
ship the full JPEG to a phone.

The hero photograph is a Scan-to-BIM point cloud, chosen because it depicts
modelling rather than a finished installation. That is the one kind of stock
image that does not misrepresent a practice which designs but does not build.

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

## Out of scope

The school software project discussed in the same meetings is a separate
engagement with a different client. It never belongs in this repo.
