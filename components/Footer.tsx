import Link from "next/link";
import { SITE_NAME } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-zinc-200 bg-zinc-50">
      <div className="mx-auto max-w-5xl px-4 py-8 text-sm text-zinc-500">
        <nav className="flex flex-wrap gap-x-6 gap-y-2">
          <Link href="/about" className="hover:text-zinc-800">
            About
          </Link>
          <Link href="/contact" className="hover:text-zinc-800">
            Contact
          </Link>
          <Link href="/press" className="hover:text-zinc-800">
            Press
          </Link>
          <Link href="/privacy" className="hover:text-zinc-800">
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:text-zinc-800">
            Terms of Use
          </Link>
        </nav>
        <p className="mt-4 text-xs leading-relaxed">
          © {new Date().getFullYear()} {SITE_NAME}. All calculators and converters are provided
          for general information only and are not a substitute for professional advice.
        </p>
      </div>
    </footer>
  );
}
