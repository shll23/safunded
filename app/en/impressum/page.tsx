import type { Metadata } from "next";
import { LegalShell } from "@/components/legal/LegalShell";
import { H2, P, B } from "@/components/legal/typography";
import { legalAlternates } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Legal Notice (Impressum) — SAFunded",
  alternates: legalAlternates("impressum"),
};

export default function ImpressumEnPage() {
  return (
    <LegalShell title="Legal Notice (Impressum)" lang="en">
      <P>
        <B>Information pursuant to § 5 DDG (German Digital Services Act)</B>
      </P>
      <P>
        SaFunded UG (i.G)
        <br />
        Marbachweg 1
        <br />
        72622 Nürtingen
        <br />
        Germany
      </P>

      <H2>Contact</H2>
      <P>Email: info@safunded.com</P>

      <H2>Legal form</H2>
      <P>Entrepreneurial company with limited liability in formation.</P>

      <H2>Responsible for the content pursuant to § 18 (2) MStV</H2>
      <P>
        SaFunded UG (i.G)
        <br />
        Marbachweg 1
        <br />
        72622 Nürtingen
        <br />
        Germany
      </P>

      <H2>EU dispute resolution</H2>
      <P>
        The European Commission provides a platform for online dispute
        resolution (ODR): https://ec.europa.eu/consumers/odr/. You can find our
        email address above in this legal notice.
      </P>

      <H2>Consumer dispute resolution / universal arbitration board</H2>
      <P>
        We are neither willing nor obliged to participate in dispute resolution
        proceedings before a consumer arbitration board.
      </P>

      <H2>Liability for content</H2>
      <P>
        As a service provider, we are responsible for our own content on these
        pages in accordance with the general laws. However, we are not obliged
        to monitor transmitted or stored third-party information or to
        investigate circumstances that indicate illegal activity. Obligations to
        remove or block the use of information under the general laws remain
        unaffected. Liability in this respect is, however, only possible from
        the point in time at which a concrete infringement of the law becomes
        known. Upon becoming aware of corresponding infringements, we will remove
        this content immediately.
      </P>

      <H2>Liability for links</H2>
      <P>
        Our offer may contain links to external third-party websites over whose
        content we have no influence. Therefore, we cannot assume any liability
        for this third-party content either. The respective provider or operator
        of the pages is always responsible for the content of the linked pages.
        Upon becoming aware of legal infringements, we will remove such links
        immediately.
      </P>

      <H2>Copyright</H2>
      <P>
        The content and works created by the site operator on these pages are
        subject to German copyright law. The reproduction, processing,
        distribution and any kind of exploitation outside the limits of
        copyright require the written consent of the respective author or
        creator. Contributions by third parties are marked as such.
      </P>
    </LegalShell>
  );
}
