"use client";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { queryClient } from "@/src/lib/queries";
import "@/src/ui/css/globals.tailwind.css";
import { interFont, spaceMonoFont } from "@/src/ui/fonts";
import { QueryClientProvider } from "@tanstack/react-query";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Force Dark Mode For Now
    <html lang="en" className="dark">
      <body
        className={`${interFont.variable} ${spaceMonoFont.variable} antialiased custom-scrollbar`}
      >
        <QueryClientProvider client={queryClient}>
          {children}
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </body>
    </html>
  );
}
