"use client";

import { useEffect } from "react";

export default function ClientFX() {
  useEffect(() => {
    const revealEls = document.querySelectorAll<HTMLElement>(".reveal, .clip-up");
    let io: IntersectionObserver | null = null;
    if ("IntersectionObserver" in window) {
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add("is-in");
              io?.unobserve(e.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
      );
      revealEls.forEach((el) => {
        if (!el.classList.contains("is-in")) io!.observe(el);
      });
    } else {
      revealEls.forEach((el) => el.classList.add("is-in"));
    }

    const nav = document.getElementById("nav");
    const hero = document.querySelector(".hero");

    const onScroll = () => {
      const y = window.scrollY || 0;
      nav?.classList.toggle("is-scrolled", y > 24);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    let heroIO: IntersectionObserver | null = null;
    if (hero && "IntersectionObserver" in window) {
      heroIO = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            nav?.classList.toggle(
              "on-hero",
              e.isIntersecting && e.intersectionRatio > 0.35
            );
          });
        },
        { threshold: [0, 0.35, 0.6] }
      );
      heroIO.observe(hero);
    }

    const px = document.querySelector<HTMLElement>("[data-parallax]");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let ticking = false;
    const onPx = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY || 0;
        if (px && y < window.innerHeight * 1.2) {
          px.style.transform = `translate3d(0,${(y * 0.18).toFixed(1)}px,0) scale(1.06)`;
        }
        ticking = false;
      });
    };
    if (px && !reduce) {
      px.style.transform = "scale(1.06)";
      px.style.willChange = "transform";
      window.addEventListener("scroll", onPx, { passive: true });
    }

    const toggle = document.querySelector<HTMLElement>(".nav-toggle");
    const toggleHandler = () => {
      const links = document.querySelector<HTMLElement>(".navlinks");
      const open = nav?.classList.toggle("menu-open");
      if (links) {
        links.style.display = open ? "flex" : "";
        links.style.position = open ? "absolute" : "";
        links.style.flexDirection = open ? "column" : "";
        links.style.top = open ? "100%" : "";
        links.style.right = open ? "var(--gut)" : "";
        links.style.background = open ? "var(--bg)" : "";
        links.style.padding = open ? "20px 28px" : "";
        links.style.borderRadius = open ? "6px" : "";
        links.style.boxShadow = open ? "0 20px 50px -24px rgba(0,0,0,.35)" : "";
        links.style.gap = open ? "14px" : "";
      }
    };
    toggle?.addEventListener("click", toggleHandler);
    const linkClick = () => {
      if (window.innerWidth <= 900) toggle?.click();
    };
    document
      .querySelectorAll(".navlinks a")
      .forEach((a) => a.addEventListener("click", linkClick));

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("scroll", onPx);
      io?.disconnect();
      heroIO?.disconnect();
      toggle?.removeEventListener("click", toggleHandler);
      document
        .querySelectorAll(".navlinks a")
        .forEach((a) => a.removeEventListener("click", linkClick));
    };
  }, []);

  return null;
}
