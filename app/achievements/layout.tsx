import MobileNavbar from "@/components/mobile-navbar";
import Sidebar from "@/components/sidebar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      <div className="hidden lg:block w-64">
        <Sidebar />
      </div>
      <MobileNavbar />
      <div className="flex-1 p-4 bg-gray-100">{children}</div>
    </div>
  );
}
