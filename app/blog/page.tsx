import Link from "next/link";
import { getBlogs } from "../../lib/microcms";

export const revalidate = 60;

export const metadata = {
  title: "Blog | MIHANADA",
  description: "MIHANADAの最新の記事・お知らせ・読みもの。",
};

function formatDate(iso: string) {
  const d = new Date(iso);
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}`;
}

export default async function BlogIndex() {
  const { contents } = await getBlogs();

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
        <section className="section">
          <div className="wrap">
            <div className="s-top is-center">
              <p className="eyebrow is-center">Blog</p>
              <h1 className="s-head">読みもの・お知らせ</h1>
            </div>

            {contents.length === 0 ? (
              <p
                style={{
                  textAlign: "center",
                  color: "var(--ink-soft)",
                  padding: "4em 0",
                }}
              >
                記事はまだありません。
              </p>
            ) : (
              <div className="news-list" style={{ borderTop: "1px solid var(--line)" }}>
                {contents.map((post) => (
                  <Link key={post.id} className="news-item" href={`/blog/${post.id}`}>
                    <span className="news-date">{formatDate(post.publishedAt)}</span>
                    <span className="news-title">
                      {post.category ? (
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
                          {post.category.name}
                        </span>
                      ) : null}
                      {post.title}
                    </span>
                    <span className="news-arr">→</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
}
