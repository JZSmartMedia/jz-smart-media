import LegalPage, { Section, P, Bullets, Callout, Strong } from '@/app/components/LegalPage';

const SECTIONS = [
  { id: 'who-we-are',      title: 'Who We Are' },
  { id: 'what-we-collect', title: 'What We Collect' },
  { id: 'how-we-use',      title: 'How We Use It' },
  { id: 'careers',         title: 'Job Applicants' },
  { id: 'sharing',         title: 'Who We Share It With' },
  { id: 'cookies',         title: 'Cookies & Tracking' },
  { id: 'retention',       title: 'How Long We Keep It' },
  { id: 'security',        title: 'Security' },
  { id: 'your-rights',     title: 'Your Rights' },
  { id: 'children',        title: "Children's Privacy" },
  { id: 'changes',         title: 'Changes to This Policy' },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      subtitle="What we collect when you use jzsmartmedia.com, why we collect it, and what you can do about it. Written in plain English."
      updated="September 17, 2026"
      sections={SECTIONS}
      otherHref="/terms"
      otherLabel="Terms of Service"
    >
      <Section id="who-we-are" n={1} title="Who We Are">
        <P>
          JZ Smart Media (&ldquo;JZ Smart Media,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) is a digital
          marketing agency based in Miami, Florida, serving home service businesses across the United States. This policy
          covers <Strong>jzsmartmedia.com</Strong> and the forms, scheduling tools, and chat widget available on it.
        </P>
        <P>
          For the purposes of privacy law, JZ Smart Media is the controller of the personal information described here. If
          you are a client, separate terms in your service agreement may also apply to data we process on your behalf.
        </P>
      </Section>

      <Section id="what-we-collect" n={2} title="What We Collect">
        <P>We only collect information that you hand us or that your browser sends automatically. Specifically:</P>

        <P><Strong>Information you give us</Strong></P>
        <Bullets
          items={[
            'Audit request forms — your name, business name, phone number, email address, and the industry you work in.',
            'Scheduling — when you book a call, your name, email, and any details you add to the booking. Bookings are handled by our scheduling provider.',
            'Chat widget — any messages you send through the on-site chat, along with the contact details you provide there.',
            'Job applications — see the Job Applicants section below, which covers a larger set of information.',
            'Direct contact — anything you include when you email or call us.',
          ]}
        />

        <P><Strong>Information collected automatically</Strong></P>
        <Bullets
          items={[
            'Your IP address, browser user-agent string, and the page you submitted a form from.',
            'Device type (mobile, tablet, or desktop).',
            'The date and time of your submission.',
          ]}
        />

        <Callout>
          We do <Strong>not</Strong> collect payment card numbers, Social Security numbers, or government ID numbers through
          this website. We do not knowingly collect sensitive categories of personal information such as health data,
          biometric data, or precise geolocation.
        </Callout>
      </Section>

      <Section id="how-we-use" n={3} title="How We Use It">
        <P>We use the information above for a short list of practical reasons:</P>
        <Bullets
          items={[
            'To respond to you — when you request a free growth audit, we use your contact details to reach out, usually within 30 minutes during business hours.',
            'To prepare what you asked for — your business name and industry let us research your market before we call, so the audit is actually about you.',
            'To schedule and hold meetings you book with us.',
            'To evaluate job applications and communicate with candidates.',
            'To keep the site working and protect it — IP addresses and user-agent data help us detect spam submissions and automated abuse.',
            'To meet legal, accounting, and record-keeping obligations.',
          ]}
        />
        <P>
          We do <Strong>not</Strong> sell your personal information. We do not share it with advertising networks, data
          brokers, or list buyers, and we do not use it for cross-context behavioral advertising.
        </P>
      </Section>

      <Section id="careers" n={4} title="Job Applicants">
        <P>
          If you apply through our careers page, we collect substantially more than we do from a marketing enquiry, and you
          should know exactly what that is before you start.
        </P>
        <Bullets
          items={[
            'Identity and contact details — name, email, phone number, location and time zone.',
            'Professional background — the role you are applying for, years of experience, industries you have worked in, tools you use, and hours of availability.',
            'Your written answers to the interview questions, your proof-of-work write-up, expected rate, earliest start date, and portfolio links.',
            'Files you upload — your CV and any proof-of-work documents. These are stored in our cloud file storage.',
            'Application session data — which step you reached, how long you spent on each step, how many times you reloaded the form, your device type, and a saved snapshot of a partially completed application so you do not lose your work.',
            'Your IP address, which we use to prevent the same person from submitting repeat or duplicate applications.',
            'Signals about whether the application appears to have been completed with AI assistance.',
          ]}
        />
        <Callout>
          Interview questions on the careers form are generated by an AI model based on the role, experience level,
          industries, and tools you select. Those four fields are sent to our AI provider to produce the questions. Your
          written answers, your CV, and your uploaded files are <Strong>not</Strong> sent to the AI provider.
        </Callout>
        <P>
          Application data is used solely to assess your candidacy and to communicate with you about it. It is not used for
          marketing.
        </P>
      </Section>

      <Section id="sharing" n={5} title="Who We Share It With">
        <P>
          We share personal information only with service providers who help us run this site, and only to the extent they
          need it. Each is bound by its own agreement with us.
        </P>
        <Bullets
          items={[
            'Resend — delivers the notification emails generated by our forms to our team inbox.',
            'Supabase — hosts the database where form submissions are stored, and the file storage where job applicants’ CVs and documents are kept.',
            'Anthropic — generates tailored interview questions for the careers form, from the limited fields described above.',
            'Cal.com — powers the booking calendar on our scheduling page.',
            'LeadConnector / HighLevel — provides the chat widget loaded on our pages.',
            'Google Fonts — serves the typefaces used across the site.',
            'Our hosting provider — serves the website itself and maintains standard server logs.',
          ]}
        />
        <P>
          We may also disclose information if we are legally required to — for example, in response to a valid subpoena or
          court order — or where necessary to establish, exercise, or defend a legal claim. If our business is ever sold or
          merged, personal information may transfer as part of that transaction; we would tell you before it became subject
          to a materially different policy.
        </P>
      </Section>

      <Section id="cookies" n={6} title="Cookies & Tracking">
        <P>
          The site itself sets a small number of functional items in your browser — for example, remembering whether you
          prefer light or dark mode. These are necessary for the site to behave the way you left it and carry no advertising
          purpose.
        </P>
        <P>
          Third-party tools we embed, such as the chat widget and the booking calendar, may set their own cookies when you
          interact with them. Those are governed by the privacy policies of the providers named above.
        </P>
        <P>
          You can block or delete cookies in your browser settings. If you do, parts of the site — particularly the chat
          widget and scheduling — may not work correctly.
        </P>
      </Section>

      <Section id="retention" n={7} title="How Long We Keep It">
        <Bullets
          items={[
            'Audit and contact enquiries — kept for as long as needed to respond and maintain a record of the relationship, then reviewed periodically and deleted when no longer needed.',
            'Client records — kept for the duration of the engagement and for as long afterwards as our legal, tax, and accounting obligations require.',
            'Job applications — kept while the role is open and for a reasonable period afterwards so we can consider you for future openings, unless you ask us to delete them sooner.',
            'Technical and server logs — kept for a short period for security and troubleshooting.',
          ]}
        />
        <P>You can ask us to delete your information at any time. See the next section.</P>
      </Section>

      <Section id="security" n={8} title="Security">
        <P>
          The site is served over HTTPS. Submissions are transmitted to our providers over encrypted connections, and access
          to the database and file storage is restricted to credentials held by our team and never exposed in the browser.
        </P>
        <P>
          That said, no method of transmission or storage on the internet is perfectly secure, and we cannot guarantee
          absolute security. Please do not send us sensitive information — financial account details, identification
          numbers, or medical information — through the forms or the chat widget on this site.
        </P>
      </Section>

      <Section id="your-rights" n={9} title="Your Rights">
        <P>
          Depending on where you live, you may have some or all of the following rights over your personal information.
          Florida residents, residents of other U.S. states with privacy statutes, and individuals in the EEA and UK are all
          welcome to make a request.
        </P>
        <Bullets
          items={[
            'Access — ask what personal information we hold about you and get a copy of it.',
            'Correction — ask us to fix information that is inaccurate or incomplete.',
            'Deletion — ask us to delete your personal information, subject to any records we are legally required to keep.',
            'Opt out — tell us to stop contacting you. Every email we send you can be replied to with a request to stop, and we will honor it.',
            'Portability — receive your information in a portable format, where that right applies to you.',
            'Non-discrimination — we will not treat you differently or degrade our service because you exercised a privacy right.',
          ]}
        />
        <P>
          To make a request, email <Strong>info@jzsmartmedia.com</Strong> with the details. We will verify your identity by
          asking you to confirm information we already hold, and we aim to respond within 30 days. We do not charge a fee
          for a reasonable request.
        </P>
      </Section>

      <Section id="children" n={10} title="Children's Privacy">
        <P>
          This site is intended for business owners and professionals. It is not directed at children, and we do not
          knowingly collect personal information from anyone under 16. If you believe a child has submitted information to
          us, contact us and we will delete it.
        </P>
      </Section>

      <Section id="changes" n={11} title="Changes to This Policy">
        <P>
          We may update this policy as our services or our providers change. When we do, we will revise the &ldquo;last
          updated&rdquo; date at the top of this page. If a change materially affects how we handle information you have
          already given us, we will make a reasonable effort to tell you directly.
        </P>
        <P>Continuing to use the site after an update means you accept the revised policy.</P>
      </Section>
    </LegalPage>
  );
}
