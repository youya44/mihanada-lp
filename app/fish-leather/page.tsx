import type { Metadata } from "next";
import Link from "next/link";
import copy from "../../content/copy.json";
import fl from "../../content/fish-leather.json";
import ClientFX from "../ClientFX";

const LINE_URL =
  process.env.NEXT_PUBLIC_LINE_URL ?? "https://line.me/R/ti/p/@mihanada";

export const metadata: Metadata = {
  title: "フィッシュレザー — Fish Leather | MIHANADA",
  description:
    "壱岐の海で水揚げされた魚の皮を、一枚ずつなめして革へ。同じ模様はふたつとない、フィッシュレザーの製品を壱岐の工房でつくっています。",
  openGraph: {
    title: "フィッシュレザー — Fish Leather | MIHANADA",
    description:
      "壱岐の海で水揚げされた魚の皮を、一枚ずつなめして革へ。世界にひとつの、フィッシュレザーの革小物。",
    images: ["/images/product-wallet.jpg"],
  },
};

function BrandLogo() {
  return (
    <img
      src="/logo-horizontal.png"
      alt="MIHANADA"
      width={486}
      height={83}
      style={{ height: "30px", width: "auto", display: "block" }}
    />
  );
}

function LeatherPlaceholder({ label }: { label: string }) {
  return (
    <div className="fl-ph" role="img" aria-label={label}>
      <span>{label}</span>
    </div>
  );
}

export default function FishLeatherPage() {
  return (
    <>
      <ClientFX />

      <header className="nav on-hero" id="nav">
        <a className="brand" href="/" aria-label="MIHANADA">
          <BrandLogo />
        </a>
        <nav className="navlinks">
          {copy.nav.map((n) => {
            const href = n.href.startsWith("#") ? `/${n.href}` : n.href;
            return (
              <a key={n.href} href={href}>
                {n.label}
              </a>
            );
          })}
        </nav>
        <a
          className="nav-ig"
          href={LINE_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="公式LINE"
        >
          <svg
            width="17"
            height="17"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
          >
            <path d="M20 11.5c0-4.14-3.58-7.5-8-7.5S4 7.36 4 11.5c0 3.72 2.9 6.83 6.8 7.4l.2.04V22l3.6-2.2c3.11-.85 5.4-3.35 5.4-6.3Z" />
          </svg>
        </a>
        <button className="nav-toggle" aria-label="メニュー">
          <span></span>
        </button>
      </header>

      <main id="top">
        {/* HERO */}
        <section className="hero fl-hero" data-screen-label="Hero">
          <div className="hero-media fl-hero-media" data-parallax>
            <div className="fl-hero-bg" aria-hidden="true" />
          </div>
          <div className="hero-copy">
            <div className="wrap">
              <div className="hero-inner reveal is-in">
                <p className="eyebrow">{fl.hero.eyebrow}</p>
                <h1>
                  {fl.hero.title.split("\n").map((l, i, arr) => (
                    <span key={i}>
                      {l}
                      {i < arr.length - 1 && <br />}
                    </span>
                  ))}
                </h1>
                <p className="hero-sub">
                  {fl.hero.sub.split("\n").map((l, i, arr) => (
                    <span key={i}>
                      {l}
                      {i < arr.length - 1 && <br />}
                    </span>
                  ))}
                </p>
                <div
                  style={{
                    display: "flex",
                    gap: 18,
                    marginTop: "clamp(30px,4vw,48px)",
                    flexWrap: "wrap",
                  }}
                >
                  <a className="btn" href={fl.hero.primaryCta.href}>
                    {fl.hero.primaryCta.label}{" "}
                    <span aria-hidden="true">→</span>
                  </a>
                  <a
                    className="btn is-ghost"
                    href={fl.hero.ghostCta.href}
                    style={{ color: "#fff", borderColor: "rgba(255,255,255,.4)" }}
                  >
                    {fl.hero.ghostCta.label}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section className="section" id="about" data-screen-label="About">
          <div className="wrap">
            <div className="fl-about">
              <div className="reveal">
                <p className="eyebrow">{fl.about.eyebrow}</p>
                <h2 className="s-head">
                  {fl.about.title.split("\n").map((l, i, arr) => (
                    <span key={i}>
                      {l}
                      {i < arr.length - 1 && <br />}
                    </span>
                  ))}
                </h2>
              </div>
              <div className="reveal reveal-d1">
                {fl.about.body.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* MATERIAL */}
        <section
          className="section sand"
          id="material"
          data-screen-label="Material"
        >
          <div className="wrap">
            <div className="s-top reveal">
              <p className="eyebrow">{fl.materials.eyebrow}</p>
              <h2 className="s-head">{fl.materials.title}</h2>
              <p className="lead">{fl.materials.lead}</p>
            </div>
            <div className="fl-materials">
              {fl.materials.items.map((m, i) => (
                <div
                  key={m.jp}
                  className={`fl-mat reveal reveal-d${Math.min(i + 1, 4)}`}
                >
                  <LeatherPlaceholder label={`${m.jp}の革`} />
                  <span className="en">{m.en}</span>
                  <h3 className="jp">{m.jp}</h3>
                  <p className="d">{m.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PROCESS */}
        <section className="section" id="process" data-screen-label="Process">
          <div className="wrap">
            <div className="s-top reveal">
              <p className="eyebrow">{fl.process.eyebrow}</p>
              <h2 className="s-head">{fl.process.title}</h2>
              <p className="lead">{fl.process.lead}</p>
            </div>
            <div className="fl-steps">
              {fl.process.steps.map((s, i) => (
                <div
                  key={s.no}
                  className={`fl-step reveal reveal-d${Math.min(i + 1, 4)}`}
                >
                  <span className="num">{s.no}</span>
                  <span className="en">{s.en}</span>
                  <h3 className="jp">{s.jp}</h3>
                  <p className="d">{s.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PRODUCTS */}
        <section
          className="section sand"
          id="products"
          data-screen-label="Products"
        >
          <div className="wrap">
            <div className="s-top reveal">
              <p className="eyebrow">{fl.products.eyebrow}</p>
              <h2 className="s-head">{fl.products.title}</h2>
              <p className="lead">{fl.products.lead}</p>
            </div>
            <div className="fl-products">
              {fl.products.items.map((p, i) => (
                <Link
                  key={p.slug}
                  href={`/fish-leather/${p.slug}`}
                  className={`fl-card reveal reveal-d${Math.min(i + 1, 4)}`}
                >
                  <LeatherPlaceholder label={p.name} />
                  <div className="body">
                    <span className="en">{p.en}</span>
                    <h3>{p.name}</h3>
                    <p className="line">{p.line}</p>
                    <p className="price">{p.price}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CUSTOM ORDER */}
        <section className="section" id="custom" data-screen-label="Custom order">
          <div className="wrap">
            <div className="s-top reveal">
              <p className="eyebrow">{fl.custom.eyebrow}</p>
              <h2 className="s-head">{fl.custom.title}</h2>
              <p className="lead">{fl.custom.lead}</p>
            </div>
            <div className="fl-steps">
              {fl.custom.steps.map((s, i) => (
                <div
                  key={s.no}
                  className={`fl-step reveal reveal-d${Math.min(i + 1, 4)}`}
                >
                  <span className="num">{s.no}</span>
                  <span className="en">{s.en}</span>
                  <h3 className="jp">{s.jp}</h3>
                  <p className="d">{s.d}</p>
                </div>
              ))}
            </div>
            <div className="fl-custom-cta reveal reveal-d2">
              <a
                className="btn"
                href={LINE_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                LINEで相談する <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="section sand" id="faq" data-screen-label="FAQ">
          <div className="wrap">
            <div className="s-top is-center reveal">
              <p className="eyebrow is-center">FAQ</p>
              <h2 className="s-head">よくあるご質問</h2>
            </div>
            <div className="dg-faq reveal reveal-d1">
              {fl.faq.map((f) => (
                <details key={f.q}>
                  <summary>
                    <span>{f.q}</span>
                    <span className="plus" aria-hidden="true">
                      +
                    </span>
                  </summary>
                  <p className="a">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="dg-final" data-screen-label="Final CTA">
          <div className="wrap">
            <p className="eyebrow">{fl.finalCta.eyebrow}</p>
            <h2>
              {fl.finalCta.title.split("\n").map((l, i, arr) => (
                <span key={i}>
                  {l}
                  {i < arr.length - 1 && <br />}
                </span>
              ))}
            </h2>
            <p>{fl.finalCta.lead}</p>
            <div className="cta-wrap">
              <a className="btn" href={fl.finalCta.cta.href}>
                {fl.finalCta.cta.label} <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER — matches top page */}
      <footer className="footer" data-screen-label="Footer">
        <div className="wrap">
          <div className="footer-grid">
            <div className="brand-block">
              <a className="brand" href="/">
                <BrandLogo />
              </a>
              <p
                className="footer-tag"
                dangerouslySetInnerHTML={{
                  __html: copy.footer.tagline.replace(/\n/g, "<br />"),
                }}
              />
            </div>
            {copy.footer.cols.map((col) => (
              <div key={col.h} className="footer-col">
                <h4>{col.h}</h4>
                <ul>
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <a href={l.href}>{l.label}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="footer-bottom">
            <small>{copy.footer.copyright}</small>
            <small>{copy.footer.subline}</small>
          </div>
        </div>
      </footer>
    </>
  );
}
