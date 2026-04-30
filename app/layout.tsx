import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import AppNavbarWrapper from "@/components/AppNavbarWrapper";
import CognivaChatWidget from "@/components/CognivaChatWidget";
import MobileWarningModal from "@/components/MobileWarningModal";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cogniva",
  description: "Real-time AI Teaching Platform",
  icons: {
    icon: "/images/logo.png",
    apple: "/images/logo.png",
    shortcut: "/images/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${bricolage.variable} antialiased`}>
        <ClerkProvider appearance={{ variables: { colorPrimary: "#fe5933" } }}>
          <AppNavbarWrapper />
          <MobileWarningModal />
          {children}
          <CognivaChatWidget />
        </ClerkProvider>
      </body>
    </html>
  );
}
