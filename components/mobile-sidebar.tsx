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
    <SheetTrigger asChild>
      <div className="xl:hidden p-2">
        <Menu className="w-6 h-6" />
      </div>
    </SheetTrigger>
    <SheetContent
      side="left"
      className="p-0 m-0 w-[22rem] xl:w-[25rem] rounded-r-md"
    >
      <Sidebar />
    </SheetContent>
  </Sheet>
);
