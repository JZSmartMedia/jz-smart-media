import LegalPage, { Section, P, Bullets, Callout, Strong } from '@/app/components/LegalPage';

const SECTIONS = [
  { id: 'agreement',     title: 'Agreement to These Terms' },
  { id: 'what-we-do',    title: 'What This Site Offers' },
  { id: 'audits',        title: 'Free Audits & Enquiries' },
  { id: 'services',      title: 'Client Services' },
  { id: 'results',       title: 'No Guarantee of Results' },
  { id: 'your-conduct',  title: 'Acceptable Use' },
  { id: 'ip',            title: 'Intellectual Property' },
  { id: 'submissions',   title: 'Content You Submit' },
  { id: 'third-party',   title: 'Third-Party Tools & Links' },
  { id: 'communication', title: 'Calls, Emails & Texts' },
  { id: 'disclaimer',    title: 'Disclaimer of Warranties' },
  { id: 'liability',     title: 'Limitation of Liability' },
  { id: 'indemnity',     title: 'Indemnification' },
  { id: 'law',           title: 'Governing Law & Disputes' },
  { id: 'changes',       title: 'Changes to These Terms' },
];

export default function TermsOfServicePage() {
  return (
    <LegalPage
      title="Terms of Service"
      subtitle="The rules for using jzsmartmedia.com and requesting our services. Please read them before you submit a form or book a call."
      updated="September 17, 2026"
      sections={SECTIONS}
      otherHref="/privacy"
      otherLabel="Privacy Policy"
    >
      <Section id="agreement" n={1} title="Agreement to These Terms">
        <P>
          These Terms of Service (&ldquo;Terms&rdquo;) govern your access to and use of <Strong>jzsmartmedia.com</Strong> and
          any content, forms, scheduling tools, or features available on it (together, the &ldquo;Site&rdquo;), operated by
          JZ Smart Media (&ldquo;JZ Smart Media,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;).
        </P>
        <P>
          By visiting the Site, submitting a form, booking a call, or using the chat widget, you agree to these Terms. If
          you do not agree, please do not use the Site. If you are accepting on behalf of a company, you confirm you have
          the authority to bind that company.
        </P>
        <P>You must be at least 18 years old and able to form a binding contract to use this Site.</P>
      </Section>

      <Section id="what-we-do" n={2} title="What This Site Offers">
        <P>
          The Site describes the marketing services JZ Smart Media provides to home service businesses — including local
          SEO, Google Business Profile management, Google Ads and Local Service Ads, Yelp advertising, review management,
          CRM and marketing automation, web development, and AI solutions.
        </P>
        <P>
          Everything on the Site is offered for general informational purposes. It is not professional, legal, financial, or
          tax advice, and you should not treat it as a substitute for advice from a qualified professional who knows your
          situation.
        </P>
      </Section>

      <Section id="audits" n={3} title="Free Audits & Enquiries">
        <P>
          When you submit an audit request or contact form, you are asking us to get in touch. Submitting a form does not
          create a client relationship and does not obligate either of us to anything further.
        </P>
        <Bullets
          items={[
            'You agree that the information you submit is accurate, that the contact details are yours or that you are authorized to provide them, and that you are authorized to discuss the business you name.',
            'We aim to respond to audit requests promptly — typically within 30 minutes during business hours. That is a target we work to, not a contractual commitment.',
            'A free audit is exactly that: a no-cost, no-obligation review. It carries no warranty, and either side may walk away at any point.',
            'We may decline to provide an audit or to work with any business, at our discretion.',
          ]}
        />
      </Section>

      <Section id="services" n={4} title="Client Services">
        <P>
          Paid services are governed by a separate written agreement, proposal, or statement of work signed between you and
          JZ Smart Media. That agreement covers scope, fees, payment terms, deliverables, timelines, and termination.
        </P>
        <Callout>
          If anything in these Terms conflicts with a signed client agreement, <Strong>the signed agreement controls</Strong>{' '}
          for the services it covers. These Terms continue to govern your general use of the Site.
        </Callout>
      </Section>

      <Section id="results" n={5} title="No Guarantee of Results">
        <P>
          Marketing outcomes depend on factors outside anyone&rsquo;s control — search engine algorithms, advertising
          platform policies, competitor activity, seasonality, your pricing and capacity, your response time to leads, and
          how your team converts them.
        </P>
        <Bullets
          items={[
            'Any statistic, case study, testimonial, or past result shown on the Site reflects a specific client in a specific market at a specific time. It is not a promise or prediction of what you will achieve.',
            'We do not guarantee any particular ranking, position, impression volume, click volume, lead count, call volume, conversion rate, revenue figure, or return on ad spend.',
            'We do not control Google, Yelp, Meta, or any other third-party platform, and we are not responsible for their algorithm changes, policy changes, account suspensions, outages, or pricing decisions.',
          ]}
        />
      </Section>

      <Section id="your-conduct" n={6} title="Acceptable Use">
        <P>When using the Site, you agree not to:</P>
        <Bullets
          items={[
            'Submit false, misleading, or fraudulent information, or impersonate another person or business.',
            'Submit automated, bulk, or spam form entries, or attempt to circumvent our anti-spam measures.',
            'Attempt to gain unauthorized access to any part of the Site, our servers, our databases, or any connected system.',
            'Scrape, crawl, harvest, or copy the Site or its content by automated means without our written permission.',
            'Introduce malware, attempt to disrupt or overload the Site, or probe it for vulnerabilities without authorization.',
            'Use the Site in violation of any applicable law, or for any unlawful or harmful purpose.',
            'Reverse engineer, decompile, or otherwise attempt to derive the source code of any part of the Site.',
          ]}
        />
        <P>
          We may suspend or block access to the Site — including by IP address — where we reasonably believe it is being
          misused.
        </P>
      </Section>

      <Section id="ip" n={7} title="Intellectual Property">
        <P>
          The Site and everything on it — including text, graphics, layout, design, logos, the JZ Smart Media name and mark,
          photographs, code, and the arrangement of all of it — is owned by JZ Smart Media or used under license, and is
          protected by copyright, trademark, and other intellectual property laws.
        </P>
        <P>
          You may view and print pages for your own internal, non-commercial use. You may not reproduce, republish,
          distribute, sell, license, or create derivative works from any part of the Site without our prior written
          permission. Trademarks and brand names belonging to third parties are the property of their respective owners and
          appear on the Site for identification only.
        </P>
      </Section>

      <Section id="submissions" n={8} title="Content You Submit">
        <P>
          You keep ownership of everything you send us — form entries, messages, documents, portfolio links, and job
          application materials. By submitting it, you grant JZ Smart Media a non-exclusive, royalty-free license to use,
          store, reproduce, and process that content for the purpose of responding to you, evaluating your enquiry or
          application, and providing the services you have asked for.
        </P>
        <P>
          You confirm that you have the right to submit whatever you send, and that it does not infringe anyone else&rsquo;s
          rights or breach any confidentiality obligation you owe to a third party.
        </P>
        <P>
          Do not send us confidential information you do not want us to have, and do not send sensitive personal data —
          payment card numbers, government identification numbers, or medical information — through the Site&rsquo;s forms
          or chat widget.
        </P>
        <P>
          How we handle personal information you submit is described in our <Strong>Privacy Policy</Strong>.
        </P>
      </Section>

      <Section id="third-party" n={9} title="Third-Party Tools & Links">
        <P>
          The Site uses third-party services to function — including email delivery, database and file storage, an AI
          provider that generates interview questions on the careers form, a booking calendar, and a chat widget. It may
          also link to third-party websites.
        </P>
        <P>
          We do not control those services or sites, we do not endorse their content, and we are not responsible for their
          availability, accuracy, security, or practices. Your use of them is governed by their own terms and privacy
          policies.
        </P>
      </Section>

      <Section id="communication" n={10} title="Calls, Emails & Texts">
        <P>
          By providing your phone number and email address through the Site, you consent to being contacted by JZ Smart
          Media about your enquiry — by phone call, email, and text message — at the details you gave us, including through
          automated dialing or messaging systems where we use them.
        </P>
        <Bullets
          items={[
            'Consent to be contacted is not a condition of purchasing any service.',
            'Message and data rates may apply to text messages, depending on your carrier and plan.',
            'You can opt out of text messages at any time by replying STOP, and out of marketing emails by using the unsubscribe link or replying and telling us to stop.',
            'We may still send you non-marketing messages relating to an active engagement, such as scheduling confirmations or account notices.',
          ]}
        />
      </Section>

      <Section id="disclaimer" n={11} title="Disclaimer of Warranties">
        <P>
          The Site and its content are provided <Strong>&ldquo;as is&rdquo; and &ldquo;as available,&rdquo;</Strong> without
          warranty of any kind, whether express, implied, or statutory. To the fullest extent permitted by law, we disclaim
          all implied warranties, including merchantability, fitness for a particular purpose, title, and
          non-infringement.
        </P>
        <P>
          We do not warrant that the Site will be uninterrupted, timely, secure, or error-free, that defects will be
          corrected, or that the Site or the servers that host it are free of harmful components. Some jurisdictions do not
          allow certain disclaimers, so parts of this section may not apply to you.
        </P>
      </Section>

      <Section id="liability" n={12} title="Limitation of Liability">
        <P>
          To the fullest extent permitted by law, JZ Smart Media and its owners, employees, and contractors will not be
          liable for any indirect, incidental, special, consequential, exemplary, or punitive damages, or for any loss of
          profits, revenue, data, business, or goodwill, arising out of or relating to your use of the Site — even if we
          have been advised that such damages are possible.
        </P>
        <P>
          Our total aggregate liability for any claim relating to the Site is limited to the greater of{' '}
          <Strong>one hundred U.S. dollars ($100)</Strong> or the amount you paid us in the three months immediately before
          the event giving rise to the claim. Liability arising from paid services is governed by the limits in your signed
          client agreement. Nothing in these Terms excludes liability that cannot lawfully be excluded.
        </P>
      </Section>

      <Section id="indemnity" n={13} title="Indemnification">
        <P>
          You agree to indemnify and hold harmless JZ Smart Media and its owners, employees, and contractors from any claim,
          demand, loss, liability, or expense — including reasonable legal fees — arising out of your use of the Site, your
          breach of these Terms, your violation of any law, or your infringement of any third party&rsquo;s rights.
        </P>
      </Section>

      <Section id="law" n={14} title="Governing Law & Disputes">
        <P>
          These Terms are governed by the laws of the State of Florida, without regard to its conflict of law rules. You
          agree that the state and federal courts located in Miami-Dade County, Florida have exclusive jurisdiction over any
          dispute arising from these Terms or the Site, and you consent to their jurisdiction and venue.
        </P>
        <P>
          Before filing anything, please contact us — most disputes are resolved faster by a conversation. Any claim must be
          brought within one year of the event that gave rise to it, to the extent that limit is permitted by law.
        </P>
        <P>
          If any provision of these Terms is found unenforceable, the rest remains in force. Our failure to enforce a
          provision is not a waiver of it.
        </P>
      </Section>

      <Section id="changes" n={15} title="Changes to These Terms">
        <P>
          We may update these Terms from time to time. When we do, we will revise the &ldquo;last updated&rdquo; date at the
          top of this page. Changes take effect when posted, and continuing to use the Site after that means you accept
          them. If you do not agree to a change, stop using the Site.
        </P>
      </Section>
    </LegalPage>
  );
}
