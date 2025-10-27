import "@/src/ui/css/globals.tailwind.css";
import { interFont, spaceMonoFont } from "@/src/ui/fonts";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Force Dark Mode For Now
    <html lang="en" className="dark">
      <body
        className={`${interFont.variable} ${spaceMonoFont.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
