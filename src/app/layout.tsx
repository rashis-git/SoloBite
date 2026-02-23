import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SoloBite — Your Fridge, One Plate, Fully Fueled",
  description: "AI-powered meal companion for solo diners. Get single-portion, nutritionally-complete recipes from what's in your fridge.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "SoloBite",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#22c55e",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" href="/icon-192.png" />
      </head>
      <body className="antialiased min-h-screen">
        <main className="max-w-md mx-auto min-h-screen overflow-x-hidden">
          {children}
        </main>
      </body>
    </html>
  );
}
