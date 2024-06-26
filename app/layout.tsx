// Next
import type { Metadata } from "next";
import { Didact_Gothic, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";

// Css
import "./globals.css";

// Local

// Fonts
const didact_gothic = Didact_Gothic({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-didact-gothic",
});
const jetbrains_mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

// Metadata
export const metadata: Metadata = {
  title: "Terminal by Tanimal",
  description: "Terminal-like website built with Next.js, React, and Tailwind",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${didact_gothic.variable} ${jetbrains_mono.variable}`}
    >
      <body className="transition-colors duration-200 h-screen flex flex-col bg-primary text-complementary dark:bg-primaryDark dark:text-complementaryDark">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
