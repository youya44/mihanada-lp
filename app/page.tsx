import copy from "../content/copy.json";
import ClientFX from "./ClientFX";
import ContactForm from "./ContactForm";
import { getBlogs } from "../lib/microcms";

export const revalidate = 60;

function formatDate(iso: string) {
  const d = new Date(iso);
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}`;
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

export default async function Home() {
  const { contents: blogs } = await getBlogs();
  const newsItems = blogs.slice(0, 4);
  return (
    <>
      <ClientFX />

      <header className="nav on-hero" id="nav">
        <a className="brand" href="#top" aria-label="MIHANADA">
          <BrandLogo />
        </a>
        <nav className="navlinks">
          {copy.nav.map((n) => (
            <a key={n.href} href={n.href}>
              {n.label}
            </a>
          ))}
        </nav>
        <a
          className="nav-ig"
          href="https://www.instagram.com/mihanada.iki?igsh=eGwyOXpvZHNjd2w="
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
        >
          <svg
            width="17"
            height="17"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
          >
            <rect x="3" y="3" width="18" height="18" rx="5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17.4" cy="6.6" r="1" fill="currentColor" stroke="none" />
          </svg>
        </a>
        <button className="nav-toggle" aria-label="メニュー">
          <span></span>
        </button>
      </header>

      <main id="top">
        {/* HERO */}
        <section className="hero" data-screen-label="Hero">
          <div className="hero-media" data-parallax>
            <video
              src="/hero.mp4"
              autoPlay
              muted
              loop
              playsInline
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
          <div className="hero-copy">
            <div className="wrap">
              <div className="hero-inner reveal is-in">
                <p className="eyebrow">{copy.hero.eyebrow}</p>
                <h1>
                  {copy.hero.title.split("\n").map((line, i, arr) => (
                    <span key={i}>
                      {line}
                      {i < arr.length - 1 && <br />}
                    </span>
                  ))}
                </h1>
                <p className="hero-sub">{copy.hero.sub}</p>
                <span className="scrollcue">
                  Scroll <span className="bar"></span>
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* MISSION */}
        <section className="mission" id="mission" data-screen-label="Mission">
          <div className="wrap wrap-narrow">
            <p className="eyebrow is-center reveal">{copy.mission.eyebrow}</p>
            <h2 className="reveal reveal-d1">
              {copy.mission.title.split("\n").map((line, i, arr) => (
                <span key={i}>
                  {line}
                  {i < arr.length - 1 && <br />}
                </span>
              ))}
            </h2>
            <p className="reveal reveal-d2">
              {copy.mission.body.split("\n").map((line, i, arr) => (
                <span key={i}>
                  {line}
                  {i < arr.length - 1 && <br />}
                </span>
              ))}
            </p>
          </div>
        </section>

        {/* CROWDFUNDING PROMO */}
        <section
          className="promo"
          id="crowdfunding"
          data-screen-label="クラファンバナー"
        >
          <div className="wrap">
            <a className="promo-banner reveal clip-up" href="#contact">
              <span className="promo-tag">
                <span className="dot"></span>
                {copy.crowdfunding.tag}
              </span>
              <img src="/placeholders/cf-banner.png" alt="クラウドファンディング準備中" />
            </a>
          </div>
        </section>

        {/* NEWS */}
        <section className="section tight" id="news" data-screen-label="News">
          <div className="wrap">
            <div className="news-row">
              <div className="reveal">
                <p className="eyebrow">{copy.news.eyebrow}</p>
                <p className="lead" style={{ marginTop: ".4em" }}>
                  {copy.news.lead}
                </p>
              </div>
              <div className="news-list reveal reveal-d1">
                {newsItems.length > 0
                  ? newsItems.map((n) => (
                      <a
                        key={n.id}
                        className="news-item"
                        href={`/blog/${n.id}`}
                      >
                        <span className="news-date">
                          {formatDate(n.publishedAt)}
                        </span>
                        <span className="news-title">
                          {n.category ? (
                            <span
                              style={{
                                color: "var(--accent-deep)",
                                fontFamily: "var(--latin)",
                                letterSpacing: ".18em",
                                textTransform: "uppercase",
                                fontSize: "11px",
                                marginRight: ".8em",
                              }}
                            >
                              {n.category.name}
                            </span>
                          ) : null}
                          {n.title}
                        </span>
                        <span className="news-arr">→</span>
                      </a>
                    ))
                  : copy.news.items.map((n, i) => (
                      <a key={i} className="news-item" href={n.href}>
                        <span className="news-date">{n.date}</span>
                        <span className="news-title">{n.title}</span>
                        <span className="news-arr">→</span>
                      </a>
                    ))}
              </div>
            </div>
          </div>
        </section>

        {/* SERVICE */}
        <section
          className="section"
          id="service"
          data-screen-label="Service"
          style={{ paddingBottom: 0 }}
        >
          <div className="wrap">
            <div className="s-top is-center reveal">
              <p className="eyebrow is-center">{copy.service.eyebrow}</p>
              <h2 className="s-head">{copy.service.title}</h2>
            </div>
          </div>
          <div className="services">
            {copy.service.items.map((s) => {
              const isSoon = s.status === "soon";
              const Tag = isSoon ? "div" : "a";
              return (
                <Tag
                  key={s.no}
                  className={`svc reveal${isSoon ? " is-soon" : ""}`}
                  {...(isSoon ? {} : { href: s.href })}
                >
                  <div className="svc-media">
                    <img src={s.image} alt={s.jp} />
                  </div>
                  <div className="svc-scrim"></div>
                  <div className="svc-inner">
                    <span className="svc-num">{s.no}</span>
                    <div className="svc-text">
                      <span className="svc-en">{s.en}</span>
                      <h3 className="svc-jp">{s.jp}</h3>
                      <p className="svc-line">{s.line}</p>
                      {isSoon ? (
                        <span className="svc-badge">準備中 · Coming Soon</span>
                      ) : (
                        <span className="svc-link">
                          詳しく見る <span className="arr">→</span>
                        </span>
                      )}
                    </div>
                  </div>
                </Tag>
              );
            })}
          </div>
        </section>

        {/* CONTACT */}
        <section className="section" id="contact" data-screen-label="Contact">
          <div className="wrap">
            <div className="contact">
              <div className="reveal">
                <p className="eyebrow">{copy.contact.eyebrow}</p>
                <h2
                  className="s-head"
                  dangerouslySetInnerHTML={{ __html: copy.contact.title }}
                />
                <p className="s-sub">{copy.contact.sub}</p>
                <p className="lead">{copy.contact.lead}</p>
                <div className="contact-aside" style={{ marginTop: "2.4em" }}>
                  {copy.contact.items.map((it) => (
                    <div key={it.k} className="li">
                      <span className="k">{it.k}</span>
                      <span>{it.v}</span>
                    </div>
                  ))}
                </div>
              </div>
              <ContactForm categories={copy.contact.categories} />
            </div>
          </div>
        </section>

        {/* JOIN US */}
        <section
          className="section join on-deep"
          id="join"
          data-screen-label="Join Us"
        >
          <div className="join-media">
            <img src={copy.join.image} alt="" />
          </div>
          <div className="wrap">
            <div className="join-inner">
              <div className="reveal">
                <p className="eyebrow">{copy.join.eyebrow}</p>
                <h2
                  dangerouslySetInnerHTML={{
                    __html: copy.join.title.replace(/\n/g, "<br />"),
                  }}
                />
                <p className="join-jp">{copy.join.jp}</p>
                <p>{copy.join.body}</p>
                <a className="btn join-cta" href="#contact">
                  話を聞いてみる <span aria-hidden="true">→</span>
                </a>
              </div>
              <div className="join-meta reveal reveal-d1">
                {copy.join.meta.map((m) => (
                  <div key={m.k} className="m">
                    <div className="k">{m.k}</div>
                    <div
                      className="v"
                      dangerouslySetInnerHTML={{ __html: m.v }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="footer" data-screen-label="Footer">
        <div className="wrap">
          <div className="footer-grid">
            <div className="brand-block">
              <a className="brand" href="#top">
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
