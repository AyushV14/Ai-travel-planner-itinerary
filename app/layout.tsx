"use client";

import "./globals.css";
import { Roboto } from "next/font/google"; // Import Roboto font
import { ClerkProvider } from "@clerk/nextjs";
import { ConvexProvider, ConvexReactClient } from "convex/react";

const roboto = Roboto({ subsets: ["latin"], weight: ["400", "500", "700"] }); // Specify font weights
const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <ConvexProvider client={convex}>
        <html lang="en">
          <body className={roboto.className}>{children}</body> {/* Apply Roboto font */}
        </html>
      </ConvexProvider>
    </ClerkProvider>
  );
}
