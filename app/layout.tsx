import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Atomity Dashboard",
  description: "Cloud Cost Optimization",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen py-16 px-4 md:px-8">{children}</body>
    </html>
  );
}
