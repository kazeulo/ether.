import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Montserrat, Poppins, Playfair_Display } from "next/font/google";
import Preloader from "./components/Preloader";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--next-font-montserrat",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
  variable: "--next-font-poppins",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--next-font-playfair",
});

export const metadata: Metadata = {
  title: "ether — every story leaves a mark",
  description: "Track and remember every movie, series, book, and game that's left a mark on you.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${montserrat.variable} ${poppins.variable} ${playfair.variable}`}>
      <body>
        <Preloader />
        {children}
      </body>
    </html>
  );
}