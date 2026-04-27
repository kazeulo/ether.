import type { ReactNode } from "react";
import Preloader from "./components/Preloader";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./globals.css";

import { Montserrat, Poppins, Playfair_Display } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-display",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
  variable: "--font-poppins",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  style: ["normal", "italic"], // important for that elegant look
  variable: "--font-playfair",
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Preloader />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}