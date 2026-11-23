import type { Metadata, Viewport } from "next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import { Instrument_Serif } from "next/font/google";
import Cursor from "@/components/Cursor";
import Motion from "@/components/Motion";
import SceneLayer from "@/components/scene/SceneLayer";
import "./globals.css";

const serif = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--font-serif" });

const site = process.env.NEXT_PUBLIC_SITE_URL ?? "https://joecodeai.github.io";
const title = "Joel Thomas — AI Engineer";
const description =
  "AI Engineer in Kochi, India. Real-time computer vision on NVIDIA GPUs, LLM systems with retrieval, agents and fine-tuning, and the software that runs them.";

export const metadata: Metadata = {
  metadataBase: new URL(site),
  title,
  description,
  authors: [{ name: "Joel Thomas", url: "https://github.com/joecodeai" }],
  keywords: ["Joel Thomas", "AI Engineer", "computer vision", "LLM", "RAG", "DeepStream", "TensorRT", "agents", "Kochi"],
  openGraph: {
    type: "website",
    url: site,
    title,
    description,
    siteName: "Joel Thomas",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Joel Thomas — AI that sees, reads, and runs in production" }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/og.png"] },
  icons: { icon: "/icon.svg" },
};

export const viewport: Viewport = { themeColor: "#0a0a0b", colorScheme: "dark" };

const personLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Joel Thomas",
  jobTitle: "AI Engineer",
  address: { "@type": "PostalAddress", addressLocality: "Kochi", addressCountry: "IN" },
  alumniOf: ["Kyungpook National University", "Christ University"],
  sameAs: ["https://github.com/joecodeai", "https://www.linkedin.com/in/joel-thomas-v/", "https://huggingface.co/joecodeai"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${GeistSans.variable} ${GeistMono.variable} ${serif.variable}`}>
      <head>
        {/* Mark JS early so reveal-on-scroll content is hidden before first paint, never after. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }} />
      </head>
      <body className="font-sans">
        <a
          href="#main"
          className="fixed left-4 top-4 z-[80] -translate-y-20 bg-paper px-4 py-2 text-sm text-ink transition-transform focus:translate-y-0"
        >
          Skip to content
        </a>
        <SceneLayer />
        <div className="grain" aria-hidden />
        <Cursor />
        <Motion />
        {children}
        <noscript>
          <style>{`.reveal{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </body>
    </html>
  );
}
