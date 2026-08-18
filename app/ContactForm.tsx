"use client";

import { useState } from "react";
import { submitContact } from "./actions/contact";

type Status =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success" }
  | { kind: "error"; message: string };

export default function ContactForm({ categories }: { categories: string[] }) {
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status.kind === "submitting") return;

    const form = e.currentTarget;
    const fd = new FormData(form);
    setStatus({ kind: "submitting" });

    const res = await submitContact({
      name: String(fd.get("name") ?? ""),
      company: String(fd.get("company") ?? ""),
      email: String(fd.get("email") ?? ""),
      category: String(fd.get("category") ?? ""),
      message: String(fd.get("message") ?? ""),
    });

    if (res.ok) {
      setStatus({ kind: "success" });
      form.reset();
    } else {
      setStatus({ kind: "error", message: res.error });
    }
  }

  if (status.kind === "success") {
    return (
      <div
        className="reveal reveal-d1 is-in"
        style={{
          padding: "clamp(36px,4vw,52px)",
          background: "var(--paper)",
          border: "1px solid var(--line-soft)",
          borderRadius: 4,
        }}
      >
        <p
          className="eyebrow"
          style={{ color: "var(--accent-deep)", margin: 0 }}
        >
          Thank you
        </p>
        <h3
          style={{
            fontFamily: "var(--serif)",
            fontWeight: 500,
            fontSize: "clamp(22px,2.4vw,30px)",
            letterSpacing: ".04em",
            margin: ".6em 0 .8em",
          }}
        >
          お問い合わせありがとうございます。
        </h3>
        <p style={{ color: "var(--ink-soft)", lineHeight: 2 }}>
          ご連絡内容を受け付けました。担当より、改めてご返信いたします。
          <br />
          小さなブランドのため、お返事までお時間をいただく場合があります。
        </p>
        <button
          type="button"
          className="tlink"
          onClick={() => setStatus({ kind: "idle" })}
          style={{ marginTop: "1.4em", background: "none", border: "none", padding: 0 }}
        >
          別の内容を送る <span className="arr">→</span>
        </button>
      </div>
    );
  }

  return (
    <form className="form reveal reveal-d1" onSubmit={onSubmit}>
      <div className="field row">
        <div className="field">
          <label>
            お名前 <span className="req">*</span>
          </label>
          <input
            className="input"
            name="name"
            placeholder="山田 花縹"
            required
          />
        </div>
        <div className="field">
          <label>会社名・屋号</label>
          <input className="input" name="company" placeholder="任意" />
        </div>
      </div>
      <div className="field">
        <label>
          メール <span className="req">*</span>
        </label>
        <input
          className="input"
          name="email"
          type="email"
          placeholder="you@example.com"
          required
        />
      </div>
      <div className="field">
        <label>
          お問い合わせ種別 <span className="req">*</span>
        </label>
        <select
          className="select"
          name="category"
          defaultValue={categories[0]}
          required
        >
          {categories.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </div>
      <div className="field">
        <label>内容</label>
        <textarea
          className="textarea"
          name="message"
          placeholder="ご相談・ご希望をお書きください。"
        ></textarea>
      </div>
      <div className="form-foot">
        <button
          className="btn"
          type="submit"
          disabled={status.kind === "submitting"}
          style={{
            opacity: status.kind === "submitting" ? 0.6 : 1,
            cursor: status.kind === "submitting" ? "wait" : "pointer",
          }}
        >
          {status.kind === "submitting" ? "送信中…" : "送信する"}{" "}
          <span aria-hidden="true">→</span>
        </button>
        {status.kind === "error" && (
          <span className="form-note" style={{ color: "#b94a4a" }}>
            {status.message}
          </span>
        )}
      </div>
    </form>
  );
}
