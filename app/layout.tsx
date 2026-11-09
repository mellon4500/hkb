import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Header, Footer } from "@/components/store";
import "./globals.css";
const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = { title: { default: "Hanna K-Beauty | Your daily skincare ritual", template: "%s | Hanna K-Beauty" }, description: "Explore the Hanna K-Beauty Korean skincare storefront prototype. Demonstration products only." };
export default function RootLayout({ children }: {
    children: React.ReactNode;
}) { return <html lang="en" className={inter.variable}><body><a className="skip-link" href="#main-content">Skip to content</a><Header />{children}<Footer /></body></html>; }
