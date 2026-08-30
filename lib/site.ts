// Central site configuration. Change these before launch.

export const SITE_NAME = "QuickCalc";
export const SITE_TAGLINE = "Free online calculators and unit converters";
export const SITE_DESCRIPTION =
  "Free online calculators and unit converters: percentage, BMI, mortgage, loan, compound interest, salary, calorie, tip, discount, fuel, GPA, plus length, weight, temperature, area, volume, speed, data and time converters.";

// Replace with your real production domain (no trailing slash).
export const SITE_URL = "https://www.quickcalc.example";

// --- Google AdSense -----------------------------------------------------
// Paste your AdSense publisher ID here, e.g. "ca-pub-1234567890123456".
// Ads render ONLY when this is set (keeps the site clean pre-approval).
export const ADSENSE_CLIENT = "";
export const ADSENSE_ENABLED = ADSENSE_CLIENT.startsWith("ca-pub-");

// --- Analytics ----------------------------------------------------------
// Google Analytics 4 measurement ID, e.g. "G-XXXXXXXXXX". Empty = disabled.
export const GA_MEASUREMENT_ID = "";

// --- Contact / compliance ----------------------------------------------
export const CONTACT_EMAIL = "contact@quickcalc.example";
