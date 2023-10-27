import "./globals.css";
import type { Metadata } from "next";

import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "BSender",
  description: "BSender sms sending application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="  h-screen flex justify-between flex-col items-center">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
