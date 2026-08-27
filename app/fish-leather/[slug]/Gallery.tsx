"use client";

import { useState } from "react";

export default function Gallery({
  images,
  name,
}: {
  images: string[];
  name: string;
}) {
  const [active, setActive] = useState(0);
  const main = images[active] ?? images[0];

  return (
    <div className="fl-gallery reveal">
      <div className="fl-gallery-main">
        <img src={main} alt={`${name} — ${active + 1}枚目`} />
      </div>
      {images.length > 1 && (
        <div className="fl-gallery-thumbs">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              className={`fl-thumb${i === active ? " is-active" : ""}`}
              onClick={() => setActive(i)}
              aria-label={`${name} ${i + 1}枚目を表示`}
            >
              <img src={src} alt="" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
