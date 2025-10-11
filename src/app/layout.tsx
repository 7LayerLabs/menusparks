import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MenuSparks - AI-Powered Menu Optimization for Restaurants",
  description: "Weekly recipe specials delivered automatically. Reduce waste, control costs, and keep your menu fresh with AI-powered menu innovation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
