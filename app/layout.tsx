import type { Metadata } from "next";
import Script from "next/script";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "The Agentic Protocol - Mastering OpenClaw & the Autonomous Workplace",
  description:
    "The definitive technical guide to building autonomous AI workflows with OpenClaw. Written by developers, for developers. 4 tiers from $19.",
  keywords: [
    "OpenClaw",
    "agentic AI",
    "autonomous workplace",
    "AI agents",
    "LLM automation",
    "developer ebook",
    "AI workflow",
    "prompt engineering",
  ],
  authors: [{ name: "The Agentic Protocol Team" }],
  openGraph: {
    title: "The Agentic Protocol - Mastering OpenClaw & the Autonomous Workplace",
    description:
      "The definitive technical guide for developers building autonomous AI systems. Get the ebook, prompt library, and Discord access.",
    url: "https://agenticprotocol.ai",
    siteName: "The Agentic Protocol",
    images: [
      {
        url: "/cover.jpg",
        width: 800,
        height: 600,
        alt: "The Agentic Protocol Book Cover",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Agentic Protocol - Mastering OpenClaw",
    description:
      "The definitive guide to autonomous AI workflows. Built by developers. Run by AI.",
    images: ["/cover.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`scroll-smooth ${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Book",
              name: "The Agentic Protocol: Mastering OpenClaw and the Autonomous Workplace",
              description:
                "The definitive technical guide to building autonomous AI workflows with OpenClaw. Expanded edition for developers and technical teams.",
              author: {
                "@type": "Organization",
                name: "The Agentic Protocol",
              },
              publisher: {
                "@type": "Organization",
                name: "The Agentic Protocol",
              },
              offers: [
                {
                  "@type": "Offer",
                  name: "The Ebook",
                  price: "19",
                  priceCurrency: "USD",
                  availability: "https://schema.org/InStock",
                },
                {
                  "@type": "Offer",
                  name: "The Agentic Bundle",
                  price: "39",
                  priceCurrency: "USD",
                  availability: "https://schema.org/InStock",
                },
                {
                  "@type": "Offer",
                  name: "The Founder Pack",
                  price: "79",
                  priceCurrency: "USD",
                  availability: "https://schema.org/InStock",
                },
              ],
              genre: "Technology",
              inLanguage: "en",
              url: "https://agenticprotocol.ai",
            }),
          }}
        />
      </head>
      <body className="bg-[#050A14] text-slate-200 antialiased">
        {children}
        {/* Polar.sh Embedded Checkout - uses Next.js Script for proper loading */}
        <Script
          src="https://cdn.jsdelivr.net/npm/@polar-sh/checkout@latest/dist/embed.global.js"
          strategy="afterInteractive"
          data-auto-init=""
        />
      </body>
    </html>
  );
}


