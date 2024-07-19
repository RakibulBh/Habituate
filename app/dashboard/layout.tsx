import type { Metadata } from "next";
import Sidebar from "@/components/sidebar";
import RightSidebar from "@/components/right-sidebar";
import { MobileSidebar } from "@/components/mobile-sidebar";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex">
      <div className="">
        <Sidebar />
      </div>
      {/* <div className="xl:hidden block">
        <MobileSidebar />
      </div> */}
      <div className="flex-1">{children}</div>
    </main>
  );
}
