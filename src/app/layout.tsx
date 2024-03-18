import "@/styles/globals.css";

import { Inter } from "next/font/google";

import Providers from "@/components/providers";
import { Toaster } from "@/components/ui/sonner";

import Navbar from '@/components/navbar';

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Terrarium",
  description: "A platform for creating and discovering mods for Terraria",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans ${inter.variable}`}>
        <Providers>
          <Navbar />
          <div className="container max-w-7xl mx-auto">
            {children}
          </div>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
