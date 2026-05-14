import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Navbar } from "@/components/navbar";
import { Toaster } from "react-hot-toast";
import { CinematicLoader } from "@/components/ui/CinematicLoader";
import { GlobalAtmosphere } from "@/components/ui/GlobalAtmosphere";
import { SmoothScroll } from "@/components/ui/SmoothScroll";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  title: {
    default: "Unique — Elite Automotive Experiences",
    template: "%s | Unique"
  },
  description: "The world's most exclusive luxury car rental platform. Experience absolute perfection with our curated hypercar and supercar collection.",
  keywords: ["luxury car rental", "hypercar rental", "supercar experience", "elite mobility", "New York car rental"],
  authors: [{ name: "Unique Team" }],
  creator: "Unique Elite",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://unique-platform.com",
    title: "Unique — Elite Automotive Experiences",
    description: "Access the world's most exclusive automotive collection.",
    siteName: "Unique",
  },
  twitter: {
    card: "summary_large_image",
    title: "Unique — Elite Automotive Experiences",
    description: "Access the world's most exclusive automotive collection.",
  },
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="font-sans">
        <ThemeProvider attribute="class" defaultTheme="light" forcedTheme="light" enableSystem={false}>
          <SmoothScroll>
            <Providers>
              <GlobalAtmosphere />
              <CinematicLoader />
              <Navbar />
              {children}
              <Toaster position="top-center" toastOptions={{
                style: { borderRadius: "16px", fontSize: "14px" },
              }} />
            </Providers>
          </SmoothScroll>
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  );
}
