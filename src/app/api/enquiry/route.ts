import { NextResponse } from "next/server";
import { CONTACT, COMPANY } from "@/lib/site";

/**
 * Enquiry handler.
 *
 * Why a route handler rather than posting straight to the form provider from
 * the browser: the provider key stays on the server, validation cannot be
 * skipped by editing the request, and swapping provider later is a change to
 * this one file rather than to the form.
 *
 * The provider is deliberately the boring part. When the custom domain and a
 * real mailbox exist, replace the fetch below with Resend or similar and
 * nothing else on the site has to change.
 */

export const runtime = "edge";

type Payload = {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  /** Honeypot. Real people never fill this in, bots fill in everything. */
  company?: string;
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(request: Request) {
  let body: Payload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Malformed request." }, { status: 400 });
  }

  // Silently accept and discard. Telling a bot it failed teaches it to retry.
  if (body.company) {
    return NextResponse.json({ ok: true });
  }

  const name = body.name?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const subject = body.subject?.trim() ?? "";
  const message = body.message?.trim() ?? "";

  if (!name || !email || !subject || !message) {
    return NextResponse.json(
      { error: "Please fill in every field." },
      { status: 400 },
    );
  }
  if (!EMAIL.test(email)) {
    return NextResponse.json(
      { error: "That email address does not look right." },
      { status: 400 },
    );
  }
  if (message.length > 5000) {
    return NextResponse.json(
      { error: "That message is too long. Please shorten it." },
      { status: 400 },
    );
  }

  const key = process.env.WEB3FORMS_KEY;
  if (!key) {
    // Never pretend to have sent something. A visitor who believes they have
    // reached BMG and has not is worse off than one who is told to email.
    console.error("WEB3FORMS_KEY is not set, enquiry could not be delivered");
    return NextResponse.json(
      {
        error: `Our form is not accepting messages at the moment. Please email us directly at ${CONTACT.email}.`,
      },
      { status: 503 },
    );
  }

  try {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: key,
        from_name: `${COMPANY.shortName} website`,
        subject: `Website enquiry: ${subject}`,
        replyto: email,
        name,
        email,
        enquiry_subject: subject,
        message,
      }),
    });

    if (!res.ok) {
      throw new Error(`provider responded ${res.status}`);
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("Enquiry delivery failed:", e);
    return NextResponse.json(
      {
        error: `We could not send that. Please email us directly at ${CONTACT.email}.`,
      },
      { status: 502 },
    );
  }
}
