// Tanzania-focused currency conversion landing pages.

export interface CurrencyPage {
  slug: string;
  name: string;
  h1: string;
  metaDescription: string;
  intro: string;
  from: string;
  to: string;
  faq: { q: string; a: string }[];
}

export const USD_TO_TZS: CurrencyPage = {
  slug: "usd-to-tzs",
  name: "USD to TZS",
  h1: "USD to TZS — US Dollar to Tanzanian Shilling Converter",
  metaDescription:
    "Convert US Dollars (USD) to Tanzanian Shillings (TZS) with live exchange rates. Free, instant USD to TZS converter for Tanzania.",
  intro:
    "Convert US Dollars to Tanzanian Shillings using the latest exchange rate. Enter an amount to see the current USD to TZS value instantly — rates refresh on every visit.",
  from: "USD",
  to: "TZS",
  faq: [
    {
      q: "What is the USD to TZS exchange rate today?",
      a: "The rate changes daily with the market. Use the converter above to see the latest indicative rate.",
    },
    {
      q: "How many Tanzanian Shillings is 1 US Dollar?",
      a: "It depends on the current rate, typically a few thousand shillings. Check the converter for today's figure.",
    },
    {
      q: "Where can I exchange USD in Tanzania?",
      a: "Banks, bureaux de change (forex bureaus) and mobile-money services all exchange dollars; rates vary slightly between them.",
    },
    {
      q: "Is USD widely accepted in Tanzania?",
      a: "US Dollars are accepted at some hotels and tourist businesses, but Tanzanian Shillings are required for most everyday payments.",
    },
  ],
};

export const TZS_TO_USD: CurrencyPage = {
  slug: "tzs-to-usd",
  name: "TZS to USD",
  h1: "TZS to USD — Tanzanian Shilling to US Dollar Converter",
  metaDescription:
    "Convert Tanzanian Shillings (TZS) to US Dollars (USD) with our live-rate converter. See the current rate and convert any amount instantly.",
  intro:
    "Convert Tanzanian Shillings to US Dollars using the latest exchange rate. Enter an amount to see the current TZS to USD value instantly.",
  from: "TZS",
  to: "USD",
  faq: [
    {
      q: "How do I convert TZS to USD?",
      a: "Divide the shilling amount by the current shillings-per-dollar rate, or simply use the converter above.",
    },
    {
      q: "What is the TZS to USD rate today?",
      a: "See the converter above for the latest indicative market rate.",
    },
    {
      q: "Why do rates differ between banks and forex bureaus?",
      a: "Each provider adds its own margin over the interbank rate, so the price you get varies slightly.",
    },
  ],
};

export const CURRENCY_PAGES: CurrencyPage[] = [USD_TO_TZS, TZS_TO_USD];
