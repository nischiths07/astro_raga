import type { Metadata, Viewport } from "next";
import "./globals.css";
import StarsBackground from "@/components/StarsBackground";
import { LanguageProvider } from "@/components/LanguageContext";
import LanguageToggle from "@/components/LanguageToggle";

export const metadata: Metadata = {
  title: "AstroRaga | Guided by the Stars",
  description: "AI-powered astrology predictions in English and Kannada.",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "AstroRaga",
  },
};

export const viewport: Viewport = {
  themeColor: "#05070a",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <LanguageProvider>
          <StarsBackground />
          <div className="viewport-center-wrapper">
            <main className="app-card-boundary">
              <LanguageToggle />
              {children}
            </main>
          </div>
        </LanguageProvider>
      </body>
    </html>
  );
}
