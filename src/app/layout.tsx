import type { Metadata } from "next";
import { JetBrains_Mono, Sora, Poppins } from "next/font/google";
import "./globals.css";
import { NavBar } from "@/components/layout/NavBar";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["800"],
});

const sora = Sora({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});

const poppins = Poppins({
  variable: "--font-chip",
  subsets: ["latin"],
  weight: ["400", "600"],
});

export const metadata: Metadata = {
  title: "Assay — check before you buy",
  description:
    "A discovery and trust layer for tokenized real-world assets: browse RWA products, and see the verification state, redemption terms, and reserve transparency the issuer's own interface won't show you.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${jetbrainsMono.variable} ${sora.variable} ${poppins.variable} antialiased`}>
        <div className="flex min-h-screen flex-col">
          <NavBar />
          <main className="flex-1">{children}</main>
          <footer className="border-t border-border-secondary bg-surface-primary px-4 py-6 sm:px-6">
            <p className="mx-auto max-w-6xl font-body text-[13px] leading-5 text-text-tertiary">
              Assay reports what issuers publish and ages it — it does not verify assets itself and
              does not touch custody, execution, or KYC. Not investment advice.
            </p>
          </footer>
        </div>
      </body>
    </html>
  );
}
