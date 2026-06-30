"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { en, type Content, type Lang } from "@/content/site";
import { es } from "@/content/site.es";

const bundles: Record<Lang, Content> = { en, es };

const STORAGE_KEY = "site-lang";

type LangContextValue = {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggle: () => void;
  content: Content;
};

const LangContext = createContext<LangContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  // Hydrate from localStorage on the client after mount (SSR-safe).
  useEffect(() => {
    const stored = typeof window !== "undefined" ? window.localStorage.getItem(STORAGE_KEY) : null;
    if (stored === "en" || stored === "es") setLangState(stored);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, l);
      document.documentElement.lang = l;
    }
  };

  const toggle = () => setLang(lang === "en" ? "es" : "en");

  return (
    <LangContext.Provider value={{ lang, setLang, toggle, content: bundles[lang] }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used within LanguageProvider");
  return ctx;
}

export function useContent(): Content {
  return useLang().content;
}
