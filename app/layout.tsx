import { ReactNode } from "react";
import type { Metadata } from "next";
import { Lato } from "next/font/google";

import NavbarComponent from "@/components/Navbar";
import FooterComponent from "@/components/Footer";
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

export default function AppLayout({ children }: Readonly<Props>) {
  return (
    <html lang="en" data-theme="autumn">
      <body className={`${lato.className} flex min-h-svh flex-col`}>
        <NavbarComponent />
        {children}
        <FooterComponent />
      </body>
    </html>
  );
}
