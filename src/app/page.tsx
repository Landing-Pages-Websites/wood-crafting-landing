"use client";

import { useTracking } from "@/hooks/useTracking";
import { QueryParamPersistence } from "@/components/QueryParamPersistence";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { TrustBar } from "@/components/ProofBar";
import { Products } from "@/components/Capabilities";
import { WhyWoodCrafting } from "@/components/WhyPurposeBuilt";
import { WhoWeServe } from "@/components/PainPoints";
import { Faq } from "@/components/Faq";
import { FinalCta } from "@/components/FinalCta";
import { SiteFooter } from "@/components/SiteFooter";
import { FloatingCTA } from "@/components/FloatingCTA";
import { TRACKING } from "@/lib/content";

export default function Page(): React.ReactElement {
  useTracking({
    siteKey: TRACKING.siteKey,
    siteId: TRACKING.siteId,
    gtmId: TRACKING.gtmId,
  });

  return (
    <main className="overflow-x-hidden bg-[var(--color-bg)]">
      <QueryParamPersistence />
      <Header />
      <Hero />
      <TrustBar />
      <Products />
      <WhyWoodCrafting />
      <WhoWeServe />
      <Faq />
      <FinalCta />
      <SiteFooter />
      <FloatingCTA />
    </main>
  );
}
