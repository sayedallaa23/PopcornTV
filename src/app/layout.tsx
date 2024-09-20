import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FreeTrial from "@/components/FreeTrial";
import MoviesContextProvider from "@/store/MoviesContextProvider";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Popcorn TV",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <MoviesContextProvider>
      <html lang="en">
        <body className={inter.className}>
          <Navbar />
          {/* <div className="w-[90%] mx-auto md:w-[84%]"> */}
          {children}
          <FreeTrial />
          <Footer />
        </body>
      </html>
    </MoviesContextProvider>
  );
}
