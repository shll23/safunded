"use client";

/**
 * ============================================================================
 *  SAFunded — LANGUAGE CONTEXT (client-side i18n)
 * ============================================================================
 *  Provides the active language (English / German) to the whole app via React
 *  context. The choice is persisted in localStorage and reflected on the
 *  <html lang> attribute, so switching is instant — no page reload.
 *
 *  Usage:
 *    const t = useT();                 // dictionary slice for active language
 *    const { lang, toggle } = useLanguage();
 * ============================================================================
 */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  translations,
  type Dictionary,
  type Language,
} from "@/lib/translations";

const STORAGE_KEY = "safunded.lang";

interface LanguageContextValue {
  lang: Language;
  setLang: (lang: Language) => void;
  toggle: () => void;
  t: Dictionary;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // SAFunded is a German-first product (the whole signed-in area is German),
  // so German is the default language. We start from the server-rendered
  // default ("de") to avoid hydration mismatches, then adopt the visitor's
  // explicitly stored preference (if any) after mount. English is always
  // reachable via the toggle and is remembered once chosen.
  const [lang, setLangState] = useState<Language>("de");

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "en" || stored === "de") {
      setLangState(stored);
    }
  }, []);

  // Keep the document language attribute in sync for accessibility / SEO.
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((next: Language) => {
    setLangState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Ignore storage errors (e.g. private mode); language still switches.
    }
  }, []);

  const toggle = useCallback(() => {
    setLang(lang === "en" ? "de" : "en");
  }, [lang, setLang]);

  const value = useMemo<LanguageContextValue>(
    () => ({ lang, setLang, toggle, t: translations[lang] }),
    [lang, setLang, toggle]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within a <LanguageProvider>");
  }
  return ctx;
}

/** Convenience hook: returns the dictionary slice for the active language. */
export function useT(): Dictionary {
  return useLanguage().t;
}
