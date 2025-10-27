import { Inter, Space_Mono } from "next/font/google";

export const interFont = Inter({
  variable: "--font-inter",
  display: "swap",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const spaceMonoFont = Space_Mono({
  variable: "--font-space-mono",
  display: "swap",
  subsets: ["latin"],
  weight: ["400", "700"],
});
