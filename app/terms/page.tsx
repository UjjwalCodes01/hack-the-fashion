import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import { EVENT } from "@/lib/content";

export const metadata: Metadata = {
  title: "Terms & Conditions | Hack the Fashion 2026",
  description: "Terms & Conditions for Hack the Fashion 2026 at the AI Skills Lab, KIET, 2–3 November 2026.",
};

const Mail = () => (
  <a href={`mailto:${EVENT.email}`} className="text-gold underline-offset-4 hover:underline">
    {EVENT.email}
  </a>
);

const SECTIONS: { id: string; title: string; body: ReactNode[] }[] = [
  {
    id: "about",
    title: "About these terms",
    body: [
      <>
        These Terms &amp; Conditions (“Terms”) apply to everyone who registers for or takes part in Hack the Fashion
        2026 (the “Event”), held on 2–3 November 2026 at the AI Skills Lab, KIET Group of Institutions, Ghaziabad. The
        Event is organised by the AI Skills Lab CoE, KIET (the “Organisers”), with title sponsor Clothsy AI, powered by
        FabricVTON, and supporting partners HP and Intel.
      </>,
      <>
        By registering, including through our application listing on Unstop, you confirm that you have read and agree
        to these Terms, the Rules and the Code of Conduct. If you register on behalf of a team, you confirm that every
        team member has agreed to them too.
      </>,
    ],
  },
  {
    id: "eligibility",
    title: "Eligibility",
    body: [
      "The Event is open to undergraduate and postgraduate students with a valid college ID, which must be shown at check-in.",
      "Teams must have 2 to 4 members. Each participant may belong to only one team.",
      "Participants under 18 must have consent from a parent or guardian to attend, including for the overnight portion of the Event.",
      "Organisers, judges and their immediate team members may not compete for prizes.",
    ],
  },
  {
    id: "registration",
    title: "Registration and selection",
    body: [
      "Applications are accepted only through the official Unstop listing linked from this website. Registrations close on 28 October 2026.",
      "Registration does not guarantee a place. The Organisers will shortlist teams and confirm selected teams by email. Selection decisions are final.",
      "You must provide accurate information. Places may be withdrawn if details are false or incomplete.",
      "Participation is free of charge.",
      <>
        Places are not transferable. Team changes after shortlisting need written approval from the Organisers at{" "}
        <Mail />.
      </>,
    ],
  },
  {
    id: "conduct",
    title: "Conduct at the event",
    body: [
      <>
        All participants, mentors, judges, volunteers and guests must follow the{" "}
        <Link href="/#code-of-conduct" className="text-gold underline-offset-4 hover:underline">
          Code of Conduct
        </Link>
        . Be respectful and inclusive. Harassment, discrimination or intimidation of any kind will not be tolerated.
      </>,
      "Follow all venue rules and instructions from KIET staff and the Organisers.",
      "Take care of the venue, equipment and network. You are responsible for any damage you cause.",
      "Alcohol, illegal substances and any dangerous items are not allowed at the venue.",
      "The Organisers may remove or disqualify anyone who breaches these Terms or the Code of Conduct, without prior warning.",
    ],
  },
  {
    id: "projects",
    title: "Projects and originality",
    body: [
      "All code must be written during the hackathon. You may plan ideas, research and designs in advance.",
      "You may use pre-trained models, open-source libraries, public APIs and frameworks, as long as you follow their licences and credit them in your submission.",
      "Projects must fit the theme of fashion and technology and must be submitted before code freeze (3 November 2026, 10:00 AM IST).",
      "Plagiarism, or submitting a previous or pre-built project, leads to disqualification.",
    ],
  },
  {
    id: "ip",
    title: "Intellectual property",
    body: [
      "Your team keeps full ownership of everything it builds. The Organisers do not claim any rights to your code, designs or ideas.",
      "By submitting, you give the Organisers a non-exclusive, royalty-free permission to show your project name, description, screenshots and demo video to promote the Event and showcase participants. This does not let anyone else use or sell your project.",
      "Demo access to Clothsy AI or other sponsor tools is governed by that provider's own terms. Access is for building your hackathon project only and may end after the Event.",
    ],
  },
  {
    id: "judging",
    title: "Judging and prizes",
    body: [
      "Projects are judged on the published criteria: innovation, technical execution, problem relevance, user experience and impact. The judges' decision is final.",
      "Prize amounts and awards are listed on the website and may change before the Event.",
      "Cash prizes are paid by bank transfer to the team leader after the Event. Prize winners may need to provide identity and bank details. Splitting prizes within the team is the team's responsibility.",
      "Prizes are subject to any taxes that apply under Indian law.",
      "Internship interviews are opportunities to interview, not guaranteed offers.",
      "The Organisers may withhold or reclaim a prize if a team is found to have broken these Terms.",
    ],
  },
  {
    id: "media",
    title: "Photos and videos",
    body: [
      "Photos and videos will be taken during the Event. By attending, you agree that the Organisers, KIET and sponsors may use footage that includes you to report on and promote the Event. If you do not want to appear in featured photos, tell the registration desk at check-in.",
    ],
  },
  {
    id: "data",
    title: "Your data",
    body: [
      "We collect the details you give at registration (such as name, email, phone, college, course and dietary preference) to run the Event: selecting teams, contacting you, arranging meals and swag, and issuing certificates.",
      "We share your details only with the parties who need them to run the Event, such as the venue and, for prize winners and internship candidates, our title sponsor Clothsy AI and FabricVTON. We do not sell your data. Your application on Unstop is also covered by Unstop's own privacy policy.",
      <>
        You can ask us to access, correct or delete your data at any time by writing to <Mail />.
      </>,
    ],
  },
  {
    id: "safety",
    title: "Health, safety and liability",
    body: [
      "You take part at your own risk. Look after your own belongings, including laptops and chargers. The Organisers and the venue are not responsible for lost, stolen or damaged items.",
      "Tell the Organisers about any medical condition or allergy that may need attention during the Event.",
      "To the extent permitted by law, the Organisers are not liable for any indirect loss arising from your participation.",
    ],
  },
  {
    id: "changes",
    title: "Changes and cancellation",
    body: [
      "The Organisers may change the schedule, venue, format, prizes or these Terms, or postpone or cancel the Event, if circumstances require it. We will tell registered participants by email and update this page. Because participation is free, no compensation is payable for changes or cancellation.",
    ],
  },
  {
    id: "law",
    title: "Governing law",
    body: ["These Terms are governed by the laws of India. Any disputes will be handled by the courts of Ghaziabad, Uttar Pradesh."],
  },
  {
    id: "contact",
    title: "Contact",
    body: [
      <>
        Questions about these Terms or the Event? Email us at <Mail />.
      </>,
    ],
  },
];

export default function TermsPage() {
  return (
    <>
      <Nav home={false} />
      <main className="relative bg-ink pb-24 pt-40 md:pt-48">
        <div aria-hidden className="houndstooth pointer-events-none absolute inset-x-0 top-0 h-[480px] opacity-[0.03] [mask-image:linear-gradient(black,transparent)]" />
        <div className="relative mx-auto w-[90%] max-w-[1200px]">
          <p className="mb-4 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-gold">
            <span className="h-px w-8 bg-gold" /> Legal
          </p>
          <h1 className="font-display text-5xl font-semibold uppercase leading-[0.95] text-ivory md:text-7xl">
            Terms &amp; <span className="italic text-gold">conditions</span>
          </h1>
          <p className="mt-4 font-mono text-xs uppercase tracking-[0.2em] text-mute">
            Hack the Fashion 2026 · Last updated 16 October 2026
          </p>

          <div className="mt-14 grid gap-12 lg:grid-cols-[260px_1fr] lg:gap-16">
            <nav aria-label="On this page" className="lg:sticky lg:top-32 lg:self-start">
              <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-gold">On this page</p>
              <ol className="space-y-1 border-l border-line">
                {SECTIONS.map((s, i) => (
                  <li key={s.id}>
                    <a href={`#${s.id}`} className="flex gap-3 py-1 pl-4 text-sm text-mute transition-colors hover:text-gold">
                      <span className="font-mono text-xs text-gold/70">{String(i + 1).padStart(2, "0")}</span>
                      {s.title}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>

            <div className="space-y-12">
              {SECTIONS.map((s, i) => (
                <section key={s.id} id={s.id} className="scroll-mt-32 border-t border-line pt-8">
                  <h2 className="flex items-baseline gap-4 font-display text-2xl font-semibold text-ivory md:text-3xl">
                    <span className="font-mono text-sm text-gold">{String(i + 1).padStart(2, "0")}</span>
                    {s.title}
                  </h2>
                  <div className="mt-4 space-y-3 leading-relaxed text-ivory/80">
                    {s.body.map((p, j) => (
                      <p key={j}>{p}</p>
                    ))}
                  </div>
                </section>
              ))}
              <Link
                href="/"
                className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-gold underline-offset-4 hover:underline"
              >
                ◂ Back to the event
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
