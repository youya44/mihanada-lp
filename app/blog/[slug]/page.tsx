import { notFound } from "next/navigation";
import Link from "next/link";
import { getBlog } from "../../../lib/microcms";

export const revalidate = 60;

function formatDate(iso: string) {
  const d = new Date(iso);
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}`;
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = await getBlog(slug);
  if (!post) return {};
  return {
    title: `${post.title} | MIHANADA`,
    description: post.title,
  };
}

export default async function BlogDetail({ params }: Props) {
  const { slug } = await params;
  const post = await getBlog(slug);
  if (!post) notFound();

  return (
    <>
      <header className="nav is-scrolled" id="nav">
        <a className="brand" href="/" aria-label="MIHANADA">
          <img
            src="/logo-horizontal.png"
            alt="MIHANADA"
            width={486}
            height={83}
            style={{ height: "30px", width: "auto", display: "block" }}
          />
        </a>
        <nav className="navlinks">
          <a href="/#news">News</a>
          <a href="/#service">Service</a>
          <a href="/blog">Blog</a>
          <a href="/#contact">Contact</a>
        </nav>
      </header>

      <main style={{ paddingTop: "140px" }}>
        <article className="section">
          <div className="wrap wrap-narrow">
            {post.category ? <p className="eyebrow">{post.category.name}</p> : null}
            <h1
              className="s-head"
              style={{ fontSize: "clamp(28px,3.6vw,46px)", marginBottom: ".8em" }}
            >
              {post.title}
            </h1>
            <p
              style={{
                fontFamily: "var(--latin)",
                letterSpacing: ".14em",
                color: "var(--ink-faint)",
                fontSize: "13px",
              }}
            >
              {formatDate(post.publishedAt)}
            </p>

            {post.eyecatch ? (
              <img
                src={post.eyecatch.url}
                alt=""
                style={{
                  width: "100%",
                  height: "auto",
                  margin: "clamp(40px,5vw,72px) 0",
                  borderRadius: 4,
                }}
              />
            ) : (
              <div style={{ height: "clamp(40px,5vw,72px)" }} />
            )}

            <div
              className="rich"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            <div style={{ marginTop: "clamp(60px,7vw,100px)" }}>
              <Link href="/blog" className="tlink">
                <span style={{ color: "var(--accent-deep)" }}>←</span> Blog一覧へ
              </Link>
            </div>
          </div>
        </article>
      </main>
    </>
  );
}
