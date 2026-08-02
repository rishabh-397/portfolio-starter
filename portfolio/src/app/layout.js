import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import BackgroundVideo from "@/components/BackgroundVideo";
import CustomCursor from "@/components/CustomCursor";
import EasterEgg from "@/components/EasterEgg";
import { LanguageProvider } from "@/components/LanguageContext";
import CookieConsent from "@/components/CookieConsent";
import AuthProvider from "@/components/AuthProvider";

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600"],
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
});

export const metadata = {
  metadataBase: new URL("https://portfolio-starter-eta.vercel.app"),
  title: "Rishabh Chaturvedi — Software Engineer",
  description:
    "Portfolio, projects, and resume of Rishabh Chaturvedi — Computer Science undergraduate at VIT Bhopal, full-stack and ML developer.",
  keywords: [
    "Rishabh Chaturvedi",
    "software engineer portfolio",
    "full stack developer",
    "VIT Bhopal",
    "React developer",
    "placement portfolio",
  ],
  authors: [{ name: "Rishabh Chaturvedi" }],
  robots: { index: true, follow: true },
  openGraph: {
    title: "Rishabh Chaturvedi — Software Engineer",
    description: "Portfolio, projects, and resume of Rishabh Chaturvedi.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rishabh Chaturvedi — Software Engineer",
    description: "Portfolio, projects, and resume of Rishabh Chaturvedi.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Rishabh Chaturvedi",
              jobTitle: "Software Engineer",
              alumniOf: "VIT Bhopal University",
              sameAs: [
                "https://github.com/rishabh-397",
                "https://leetcode.com/u/h4dcxOA0Pj/",
                "https://www.hackerrank.com/profile/rishabh_cha2005",
              ],
            }),
          }}
        />
        <LanguageProvider>
        <AuthProvider>
          <BackgroundVideo />
          <CustomCursor />
          <EasterEgg />
          <CookieConsent />
          {children}
        </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}