import { ReactNode } from "react";
import type { Metadata } from "next";
import { Lato } from "next/font/google";

import { Navbar, Footer } from "@/components/global";
import "./globals.css";

const lato = Lato({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Skill Hub by iLAB",
};

interface Props {
  children: ReactNode;
}

export default function RootLayout({ children }: Readonly<Props>) {
  return (
    <html lang="en" data-theme="bumblebee">
      <body className={`${lato.className} flex min-h-svh flex-col`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
