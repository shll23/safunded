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
import { usePathname } from "next/navigation";
import {
  translations,
  type Dictionary,
  type Language,
} from "@/lib/translations";
import { legalLocaleFromPath } from "@/lib/legal";

const STORAGE_KEY = "safunded.lang";
/** Cookie name mirroring the stored preference (server-readable, 1 year). */
const COOKIE_NAME = "safunded.lang";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

/**
 * Persists the chosen language to both localStorage and a cookie. The cookie
 * lets the preference survive across pages/sessions and be read server-side;
 * localStorage keeps the instant client-side toggle working. Safe to call from
 * anywhere on the client (e.g. when following a locale-route link).
 */
export function persistLang(lang: Language): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, lang);
  } catch {
    // Ignore storage errors (e.g. private mode); language still switches.
  }
  try {
    document.cookie = `${COOKIE_NAME}=${lang}; path=/; max-age=${COOKIE_MAX_AGE}; samesite=lax`;
  } catch {
    // Ignore cookie errors; the locale route still carries the language.
  }
}

function readStoredLang(): Language | null {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "en" || stored === "de") return stored;
  } catch {
    // fall through to cookie
  }
  const match = document.cookie.match(/(?:^|;\s*)safunded\.lang=(en|de)/);
  return (match?.[1] as Language) ?? null;
}

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
  // reachable via the switcher and is remembered once chosen.
  const [storedLang, setStoredLang] = useState<Language>("de");

  useEffect(() => {
    const stored = readStoredLang();
    if (stored) {
      setStoredLang(stored);
    }
  }, []);

  // Locale-routed legal pages ("/<slug>" vs. "/en/<slug>") dictate the language
  // from the URL, so the whole chrome (switcher, footer, <html lang>) matches
  // the page the visitor is on. Everywhere else the stored preference wins.
  const pathname = usePathname();
  const routeLang = legalLocaleFromPath(pathname)?.lang ?? null;
  const lang: Language = routeLang ?? storedLang;

  // Keep the document language attribute in sync for accessibility / SEO.
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((next: Language) => {
    setStoredLang(next);
    persistLang(next);
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
