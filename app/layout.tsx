import type { Metadata } from "next";
import { Inter, Unbounded } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const unbounded = Unbounded({
  subsets: ["latin"],
  variable: "--font-unbounded",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: {
    default: "Comet Recruitment — Pre-screened talent, faster hires",
    template: "%s | Comet Recruitment",
  },
  description: "Pre-screened. Ready to land.",
  openGraph: {
    title: "Comet Recruitment — Pre-screened talent, faster hires",
    description:
      "Comet sources, screens, and delivers top talent so you interview fewer people and hire faster.",
    url: "https://cometrecruitment.com",
    siteName: "Comet Recruitment",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Comet Recruitment",
    description: "Pre-screened. Ready to land.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${unbounded.variable} ${inter.variable} font-sans antialiased bg-white`}>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
