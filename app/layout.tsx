import type { Metadata } from "next";
import "./globals.css";
import { connectToMongoDB } from "@/lib/mongodb";
import { Poppins } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Habituate",
  description: "Earn XP and improve in life.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  connectToMongoDB();
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${poppins.className} antialiased`}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
