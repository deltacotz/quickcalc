"use client";

import { createContext, useContext, useSyncExternalStore, type ReactNode } from "react";
import { detectCurrency, type Currency } from "@/lib/currency";
import { DEFAULT_CURRENCY } from "@/lib/site";

interface CurrencyState {
  currency: Currency;
  setCurrency: (c: Currency) => void;
}

const STORAGE_KEY = "qc-currency";
const CHANGE_EVENT = "qc-currency-change";

function readStoredOrDetect(): Currency {
  if (typeof localStorage === "undefined") return DEFAULT_CURRENCY;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "USD" || stored === "TZS") return stored;
  } catch {
    // localStorage unavailable — fall through to locale detection.
  }
  if (typeof navigator === "undefined") return DEFAULT_CURRENCY;
  return detectCurrency(navigator.language);
}

function subscribe(callback: () => void): () => void {
  window.addEventListener("storage", callback);
  window.addEventListener(CHANGE_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(CHANGE_EVENT, callback);
  };
}

const CurrencyContext = createContext<CurrencyState>({
  currency: DEFAULT_CURRENCY,
  setCurrency: () => {},
});

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const currency = useSyncExternalStore(subscribe, readStoredOrDetect, () => DEFAULT_CURRENCY);

  const setCurrency = (c: Currency) => {
    try {
      localStorage.setItem(STORAGE_KEY, c);
    } catch {
      // ignore persistence failure
    }
    window.dispatchEvent(new Event(CHANGE_EVENT));
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency(): CurrencyState {
  return useContext(CurrencyContext);
}
