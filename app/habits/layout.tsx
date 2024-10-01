import type { Metadata } from "next";
import Sidebar from "@/components/sidebar";
import { MobileSidebar } from "@/components/mobile-sidebar";
import MobileNavbar from "@/components/mobile-navbar";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen flex flex-col lg:flex-row">
      <div className="hidden lg:block w-72">
        <Sidebar />
      </div>
      <MobileNavbar />
      <div className="flex-1 bg-gray-100">{children}</div>
    </div>
  );
}
