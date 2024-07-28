import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import Sidebar from "./sidebar";
import { Menu } from "lucide-react";

export const MobileSidebar = () => (
  <Sheet>
    <SheetTrigger className="bg-teal-500 hover:bg-teal-600" asChild>
      <div className="p-1 rounded-md text-white hover:cursor-pointer">
        <Menu className="w-6 h-6" />
      </div>
    </SheetTrigger>
    <SheetContent side="left" className="p-0 m-0 w-full sm:w-64 xl:w-80">
      <div className="h-full overflow-hidden">
        <Sidebar />
      </div>
    </SheetContent>
  </Sheet>
);
