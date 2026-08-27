import type { Metadata } from "next";
import copy from "../../content/copy.json";
import ClientFX from "../ClientFX";

const LINE_URL =
  process.env.NEXT_PUBLIC_LINE_URL ?? "https://lin.ee/xoSEDWK";

export const metadata: Metadata = {
  title: "デジタル魚拓 — Gyotaku | MIHANADA",
  description:
    "釣り上げた一匹を、和紙の質感を生かしたデジタル魚拓に。壱岐からお届けする、写真から作品まで。公式LINEでご相談いただけます。",
  openGraph: {
    title: "デジタル魚拓 — Gyotaku | MIHANADA",
    description:
      "釣り上げた一匹を、和紙の質感を生かしたデジタル魚拓に。壱岐からお届けする、写真から作品まで。",
    images: ["/images/service-gyotaku.jpg"],
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

const specs = [
  { k: "Species", v: "魚種 / 魚名" },
  { k: "Length", v: "サイズ" },
  { k: "Date & Place", v: "釣行日・釣れた場所" },
  { k: "Angler's note", v: "思い出のひとこと" },
];

const steps = [
  {
    no: "01",
    en: "Send photo",
    jp: "写真を送る",
    d: "魚がよく見える写真を、公式LINEへ送ってください。撮り方に迷ったら、下のフォトガイドをご覧ください。",
  },
  {
    no: "02",
    en: "Talk it over",
    jp: "内容を相談する",
    d: "魚種、サイズ、釣行日、場所、入れたい言葉などを伺います。仕上がりのイメージも一緒に整えていきます。",
  },
  {
    no: "03",
    en: "Receive",
    jp: "データを受け取る",
    d: "確認と調整を経て、完成したデジタル魚拓をお届けします。仕上がりに満足いただけるまで丁寧にすり合わせます。",
  },
];

const photoTips = [
  "魚の全体が写っている",
  "真上または真横から撮影している",
  "ヒレや尾まで隠れていない",
  "明るい場所で、影が少ない",
  "サイズが分かるものが一緒に写っていると尚よい",
];

const faqs = [
  {
    q: "どんな魚でもつくれますか？",
    a: "基本的には可能です。写真の状態や魚の特徴によって、最適な表現方法をこちらからご提案します。",
  },
  {
    q: "釣った直後の写真でなくても大丈夫ですか？",
    a: "魚の全体や特徴が確認できる写真であれば、少し前のものでもご相談いただけます。まずはLINEでお送りください。",
  },
  {
    q: "完成までどのくらいかかりますか？",
    a: "内容確認後、目安の日数を公式LINEでご案内します。混み具合や仕上げの内容によって前後します。",
  },
  {
    q: "作品の用途は自由ですか？",
    a: "個人でお楽しみいただく範囲であれば、印刷して飾る・データとして残す、いずれも自由にお使いいただけます。",
  },
];

const options = [
  {
    name: "背景 A　白黒",
    note: "墨拓と和紙の、もっともシンプルな仕上げ",
    price: "無料",
  },
  {
    name: "背景 B　淡彩",
    note: "淡い色を添えた、やわらかな仕上げ",
    price: "有料",
  },
  {
    name: "背景 C　木目",
    note: "木の質感を生かした、あたたかな仕上げ",
    price: "有料",
  },
  {
    name: "スクエア出力",
    note: "SNSや額装に合わせやすい正方形フォーマット",
    price: "+ ¥500",
  },
  {
    name: "タックル欄を追加",
    note: "ロッド・リール・ラインなどを一緒に記録",
    price: "+ ¥500",
  },
  {
    name: "現認者欄を追加",
    note: "一緒に釣行した方の名前を添える",
    price: "+ ¥500",
  },
];

export default function DigitalGyotakuPage() {
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
        <section className="hero" data-screen-label="Hero">
          <div className="hero-media dg-hero-media" data-parallax>
            <img src="/images/service-gyotaku.jpg" alt="" />
          </div>
          <div className="hero-copy">
            <div className="wrap">
              <div className="hero-inner reveal is-in">
                <p className="eyebrow">02 — Gyotaku</p>
                <h1>
                  あの日の一匹を、
                  <br />
                  いつまでも鮮やかに。
                </h1>
                <p className="hero-sub">
                  釣り上げた瞬間の高鳴りも、その魚と出会った海の景色も。
                  <br />
                  一枚の写真から、あなただけのデジタル魚拓をつくります。
                </p>
                <div style={{ display: "flex", gap: 18, marginTop: "clamp(30px,4vw,48px)", flexWrap: "wrap" }}>
                  <a
                    className="btn"
                    href={LINE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    LINEで相談する <span aria-hidden="true">→</span>
                  </a>
                  <a
                    className="btn is-ghost"
                    href="#overview"
                    style={{ color: "#fff", borderColor: "rgba(255,255,255,.4)" }}
                  >
                    サービスを見る
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SERVICE OVERVIEW */}
        <section className="section" id="overview" data-screen-label="Service overview">
          <div className="wrap">
            <div className="s-top reveal">
              <p className="eyebrow">Service overview</p>
              <h2 className="s-head">
                一枚の写真から、
                <br />
                一枚の作品に。
              </h2>
            </div>
            <div className="dg-intro reveal reveal-d1">
              <div />
              <div>
                <p>
                  魚の写真と釣行の記録から、和紙の質感を生かしたデジタル魚拓をつくります。
                  基本は横長・白黒の仕上げ。魚種、サイズ、釣行日、場所、そして
                  思い出のひとことまで含めて、一枚の作品として仕立てます。
                </p>
                <p>
                  従来の魚拓の力強さは残しながら、飾りやすく、贈りやすく。
                  スマートフォンの中でも、額装しても、その日の海の記憶を鮮やかに残せます。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* BASIC PLAN */}
        <section className="section sand" id="basic" data-screen-label="Basic plan">
          <div className="wrap">
            <div className="dg-basic">
              <div className="aside reveal">
                <p className="eyebrow">Basic plan</p>
                <h2 className="s-head">基本のデジタル魚拓</h2>
                <p>
                  まずはこの一枚から。標準の仕上げには、以下の情報を含めています。
                  追加したい項目はオプションからお選びいただけます。
                </p>
              </div>
              <div className="reveal reveal-d1">
                <div className="dg-spec-list">
                  {specs.map((s) => (
                    <div key={s.k} className="row">
                      <span className="k">{s.k}</span>
                      <span className="v">{s.v}</span>
                    </div>
                  ))}
                </div>

                <div className="dg-sample">
                  <div className="head">
                    <span className="l">Sample layout</span>
                    <span className="r">横長 / 白黒</span>
                  </div>
                  <svg
                    viewBox="0 0 400 180"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="0.8"
                    aria-hidden
                  >
                    <path d="M60 92 C110 34 220 34 300 92 C320 107 340 112 360 110 C340 120 320 112 300 122 C220 180 110 180 60 122 C50 114 40 114 30 110 C40 100 50 100 60 92 Z" />
                    <circle cx="280" cy="82" r="3" fill="currentColor" />
                    <line x1="20" y1="156" x2="180" y2="156" strokeDasharray="2 3" />
                    <line x1="20" y1="166" x2="120" y2="166" strokeDasharray="2 3" />
                  </svg>
                  <div className="meta">
                    <p>マハタ / 45cm</p>
                    <p>2026.05.12</p>
                    <p>壱岐 郷ノ浦沖</p>
                    <p>凪の朝、単独釣行</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* HOW TO ORDER */}
        <section className="section" id="order" data-screen-label="How to order">
          <div className="wrap">
            <div className="s-top reveal">
              <p className="eyebrow">How it works</p>
              <h2 className="s-head">
                つくり方は、
                <br />
                シンプルです。
              </h2>
              <p className="lead">
                やりとりはすべて公式LINEで完結します。
                届いた一枚を丁寧に受け取り、あなたの記憶をかたちに整えていきます。
              </p>
            </div>
            <div className="dg-steps">
              {steps.map((s, i) => (
                <div
                  key={s.no}
                  className={`dg-step reveal reveal-d${Math.min(i + 1, 4)}`}
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

        {/* PHOTO GUIDE */}
        <section
          className="section sand"
          id="photo"
          data-screen-label="Photo guide"
        >
          <div className="wrap">
            <div className="dg-photo">
              <div className="media reveal">
                <img src="/images/material.jpg" alt="" />
                <span className="tag">Photo guide</span>
              </div>
              <div className="reveal reveal-d1">
                <p className="eyebrow">Photo guide</p>
                <h2 className="s-head">
                  いい一枚は、
                  <br />
                  いい記憶になる。
                </h2>
                <p className="lead">
                  こんな写真が届くと、仕上がりがぐっと綺麗になります。
                  難しく考えず、まずは手元の一枚をお送りください。
                </p>
                <ul className="dg-tips">
                  {photoTips.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="section" id="faq" data-screen-label="FAQ">
          <div className="wrap">
            <div className="s-top is-center reveal">
              <p className="eyebrow is-center">FAQ</p>
              <h2 className="s-head">よくあるご質問</h2>
            </div>
            <div className="dg-faq reveal reveal-d1">
              {faqs.map((f) => (
                <details key={f.q}>
                  <summary>
                    <span>{f.q}</span>
                    <span className="plus" aria-hidden="true">+</span>
                  </summary>
                  <p className="a">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* OPTION MENU */}
        <section
          className="section sand"
          id="options"
          data-screen-label="Option menu"
        >
          <div className="wrap">
            <div className="s-top is-center reveal">
              <p className="eyebrow is-center">Option menu</p>
              <h2 className="s-head">
                もう少し、
                <br />
                あなたらしい一枚に。
              </h2>
              <p className="lead" style={{ marginInline: "auto", textAlign: "center" }}>
                飾る場所や、その日に残したい記憶に合わせてお選びいただけます。
                価格は目安です。詳しくは公式LINEでご案内します。
              </p>
            </div>
            <div className="dg-options reveal reveal-d1">
              {options.map((o) => (
                <div key={o.name} className="row">
                  <span className="name">{o.name}</span>
                  <span className="note">{o.note}</span>
                  <span className="price">{o.price}</span>
                </div>
              ))}
            </div>
            <p className="dg-options-foot">
              ※「淡彩」「木目」の背景は有料オプションです。金額は仕上げの内容に応じて公式LINEでご案内します。
            </p>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="dg-final" data-screen-label="Final CTA">
          <div className="wrap">
            <p className="eyebrow">Contact</p>
            <h2>
              海のしずけさを、
              <br />
              あなたの一枚に。
            </h2>
            <p>
              魚を釣った日のことを、何度でも思い出せるように。
              <br />
              まずは、その一枚をLINEで見せてください。
            </p>
            <div className="cta-wrap">
              <a
                className="btn"
                href={LINE_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                公式LINEで相談する <span aria-hidden="true">→</span>
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
