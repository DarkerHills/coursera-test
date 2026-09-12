import type { Metadata } from "next";
import { JetBrains_Mono, Sora, Poppins, Inter } from "next/font/google";
import "./globals.css";

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

// Used by the My House My Way marketing route (`/my-house-my-way`) — the
// Figma source specifies Satoshi for display type, which isn't distributable
// via next/font/google; Inter at heavy weights is the closest same-family
// substitute and is also the source's own body/UI face, so one family covers
// both roles cleanly. See src/app/my-house-my-way/README.md for details.
const inter = Inter({
  variable: "--font-mhmw",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Assay — check before you buy",
  description:
    "A discovery and trust layer for tokenized real-world assets: browse RWA products, and see the verification state, redemption terms, and reserve transparency the issuer's own interface won't show you.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${jetbrainsMono.variable} ${sora.variable} ${poppins.variable} ${inter.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
