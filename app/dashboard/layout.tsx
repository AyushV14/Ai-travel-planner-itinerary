//app/dashboard/layout.tsx
"use client";
import { ClerkProvider } from "@clerk/nextjs";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import Navbar from "./_components/Navbar";
import Footer from "./_components/Footer";


const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={` flex flex-col min-h-screen`}>
                <Navbar />
                <main className="flex-grow">{children}</main> 
                <Footer />
            </body>
        </html>
    );
}
