import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarLucide } from "lucide-react";

import React, { Dispatch, SetStateAction } from "react";
import { NavButton } from "./top-nav";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { formatDate } from "@/lib/utils";

const DaySelector = ({
  currentDate,
  setCurrentDate,
}: {
  currentDate: Date | undefined;
  setCurrentDate: Dispatch<SetStateAction<Date | undefined>>;
}) => {
  return (
    <Popover>
      <PopoverTrigger>
        <div className="text-white flex items-center justify-center p-2 gap-2 rounded-md bg-buttonGray">
          <CalendarLucide />
          <p>{formatDate(currentDate)}</p>
        </div>
      </PopoverTrigger>
      <PopoverContent className="p-0 m-0">
        <Calendar
          mode="single"
          selected={currentDate}
          onSelect={setCurrentDate}
        />
      </PopoverContent>
    </Popover>
  );
};

export default DaySelector;
