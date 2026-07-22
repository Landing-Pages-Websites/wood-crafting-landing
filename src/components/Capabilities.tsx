"use client";

import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { Icon } from "@/components/icons";
import { CTA, PRODUCTS } from "@/lib/content";

export function Products(): React.ReactElement {
  return (
    <section id="products" className="relative bg-[var(--color-surface)] py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal className="max-w-3xl">
          <p className="eyebrow">The material</p>
          <h2 className="mt-3 font-display text-[2rem] leading-[1.1] text-[var(--color-text)] md:text-4xl lg:text-[2.8rem]">
            Four reclaimed product lines,{" "}
            <span className="text-[var(--color-primary)]">supplied to spec</span>.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-[var(--color-muted)]">
            Every line is 100% salvaged from real structures, graded and sorted in
            house, and processed to the finish and profile your build calls for.
          </p>
        </Reveal>

        <div className="mt-14 space-y-16 md:space-y-24">
          {PRODUCTS.map((product, i) => {
            const imageFirst = i % 2 === 1;
            return (
              <Reveal key={product.id}>
                <article
                  id={product.id}
                  className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14"
                >
                  {/* Image */}
                  <div className={imageFirst ? "lg:order-2" : "lg:order-1"}>
                    <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-card-lg ring-1 ring-[var(--color-border)]">
                      <Image
                        src={product.image}
                        alt={product.imageAlt}
                        fill
                        sizes="(min-width: 1024px) 46vw, 92vw"
                        className="object-cover transition-transform duration-[400ms] ease-out hover:scale-[1.03]"
                      />
                    </div>
                  </div>

                  {/* Copy */}
                  <div className={imageFirst ? "lg:order-1" : "lg:order-2"}>
                    <div className="flex items-center gap-3">
                      <span className="font-display text-sm font-bold text-[var(--color-primary)]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="h-px flex-1 bg-[var(--color-border)]" />
                      <p className="eyebrow">{product.eyebrow}</p>
                    </div>
                    <h3 className="mt-4 font-display text-2xl leading-tight text-[var(--color-text)] md:text-3xl">
                      {product.title}
                    </h3>
                    <p className="mt-4 text-[15px] leading-relaxed text-[var(--color-muted)] md:text-base">
                      {product.body}
                    </p>
                    <ul className="mt-6 flex flex-wrap gap-2">
                      {product.specs.map((spec) => (
                        <li
                          key={spec}
                          className="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-border)] bg-[var(--color-surface-2)] px-3 py-1.5 text-xs font-semibold text-[var(--color-text)]"
                        >
                          <Icon name="check" className="h-3.5 w-3.5 text-[var(--color-primary)]" strokeWidth={2.6} />
                          {spec}
                        </li>
                      ))}
                    </ul>
                    <a
                      href={CTA.heroFormAnchor}
                      className="mt-7 inline-flex items-center gap-2 font-semibold text-[var(--color-primary)] transition-colors hover:text-[var(--color-primary-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] rounded-md"
                    >
                      {CTA.primary}
                      <Icon name="arrow" className="h-4 w-4" strokeWidth={2.4} />
                    </a>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
