import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import copy from "../../../content/copy.json";
import fl from "../../../content/fish-leather.json";
import ClientFX from "../../ClientFX";
import Gallery from "./Gallery";

const LINE_URL =
  process.env.NEXT_PUBLIC_LINE_URL ?? "https://line.me/R/ti/p/@mihanada";

type Params = { slug: string };

export function generateStaticParams() {
  return fl.products.items.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = fl.products.items.find((x) => x.slug === slug);
  if (!p) return { title: "Not found | MIHANADA" };
  return {
    title: `${p.name} — Fish Leather | MIHANADA`,
    description: p.desc,
    openGraph: {
      title: `${p.name} — Fish Leather | MIHANADA`,
      description: p.desc,
    },
  };
}

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

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const product = fl.products.items.find((x) => x.slug === slug);
  if (!product) notFound();

  const others = fl.products.items.filter((x) => x.slug !== slug);

  const specs = [
    { k: "Material", v: product.material },
    { k: "Color", v: "黒" },
    { k: "Size", v: product.size },
    { k: "Made in", v: "Japan" },
    { k: "Note", v: "一点物のため、鱗の模様は一枚ずつ異なります" },
  ];

  return (
    <>
      <ClientFX />

      <header className="nav is-scrolled" id="nav">
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

      <main id="top" className="fl-detail-main">
        {/* BREADCRUMB */}
        <div className="wrap fl-crumb">
          <Link href="/">Home</Link>
          <span aria-hidden="true">/</span>
          <Link href="/fish-leather">Fish Leather</Link>
          <span aria-hidden="true">/</span>
          <span>{product.name}</span>
        </div>

        {/* PRODUCT DETAIL */}
        <section className="section fl-detail" data-screen-label="Product">
          <div className="wrap">
            <div className="fl-detail-grid">
              <Gallery images={product.images} name={product.name} />

              <div className="fl-detail-info reveal reveal-d1">
                <p className="eyebrow">
                  Fish Leather — {product.en}
                </p>
                <h1 className="fl-detail-title">{product.name}</h1>
                <p className="fl-detail-price">{product.price}</p>
                <p className="fl-detail-desc">{product.desc}</p>

                <div className="fl-detail-cta">
                  <a className="btn" href="#">
                    オンラインストアで購入する{" "}
                    <span aria-hidden="true">→</span>
                  </a>
                  <a
                    className="btn is-ghost"
                    href={LINE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    LINEで在庫・柄を相談する
                  </a>
                </div>

                <p className="fl-detail-note">
                  すべて一点物です。鱗の模様は個体ごとに異なるため、写真と実物の表情は一枚ずつ違います。
                </p>

                <div className="fl-spec-list">
                  {specs.map((s) => (
                    <div key={s.k} className="row">
                      <span className="k">{s.k}</span>
                      <span className="v">{s.v}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CARE */}
        <section className="section sand" data-screen-label="Care">
          <div className="wrap">
            <div className="fl-care reveal">
              <p className="eyebrow">Care</p>
              <h2 className="s-head">長く使っていただくために。</h2>
              <ul className="fl-care-list">
                {fl.productCare.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* OTHER PRODUCTS */}
        <section className="section" data-screen-label="Other products">
          <div className="wrap">
            <div className="s-top reveal">
              <p className="eyebrow">Other products</p>
              <h2 className="s-head">ほかの製品</h2>
            </div>
            <div className="fl-others">
              {others.map((p, i) => (
                <Link
                  key={p.slug}
                  href={`/fish-leather/${p.slug}`}
                  className={`fl-card reveal reveal-d${Math.min(i + 1, 4)}`}
                >
                  <div className="fl-card-media">
                    <img src={p.images[0]} alt={p.name} />
                  </div>
                  <div className="body">
                    <h3>{p.name}</h3>
                    <p className="price">{p.price}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
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
