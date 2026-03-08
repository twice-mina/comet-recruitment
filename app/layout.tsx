import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "TPA Careers — AI Jobs & Prompt Engineering Roles",
    template: "%s | TPA Careers",
  },
  description:
    "Find your next AI career. The Prompt Academy connects certified AI professionals with top employers seeking prompt engineering, machine learning, and AI talent.",
  openGraph: {
    title: "TPA Careers — AI Jobs & Prompt Engineering Roles",
    description:
      "Find your next AI career. The Prompt Academy connects certified AI professionals with top employers.",
    url: "https://careers.thepromptacademy.com",
    siteName: "TPA Careers",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TPA Careers — AI Jobs & Prompt Engineering Roles",
    description:
      "Find your next AI career. The Prompt Academy connects certified AI professionals with top employers.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
