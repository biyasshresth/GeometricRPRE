import type { Metadata, Viewport } from "next";
import { Geist, Lora } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/provider/SmoothScrollProvider";
import LayoutClient from "@/provider/LayoutClient";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });
const lora = Lora({ subsets: ["latin"], variable: "--font-lora" });

export const metadata: Metadata = {
  title: "RPRE — Digital Studio | Web Development & Design",
  description:
    "RPRE is a digital studio crafting elegant, high-performance websites and web applications. Design, development, and 3D experiences.",
  generator: "v0.app",
};

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`bg-background ${geist.variable} ${lora.variable}`}
    >
      <body suppressHydrationWarning>
        <SmoothScrollProvider>
          <LayoutClient>
            {children}
            {/* {process.env.NODE_ENV === "production" && <Analytics />} */}
          </LayoutClient>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
