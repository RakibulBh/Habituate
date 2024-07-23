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
    <SheetTrigger className="" asChild>
      <Button className="xl:hidden p-2">
        <Menu className="w-6 h-6" />
      </Button>
    </SheetTrigger>
    <SheetContent side="left" className="p-0 m-0 w-full sm:w-64 xl:w-80">
      <div className="h-full overflow-hidden">
        <Sidebar />
      </div>
    </SheetContent>
  </Sheet>
);
