import * as React from "react";
import { format, addDays, subDays, startOfWeek } from "date-fns";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import CalendarDay from "./calendar-day";

export function DayCarousel({
  currentDate,
  baseDate,
  setCurrentDate,
}: {
  currentDate: string;
  baseDate: Date;
  setCurrentDate: (date: string) => void;
}) {
  const generateWeekDates = (startDate: Date) => {
    const start = startOfWeek(startDate, { weekStartsOn: 1 }); // Assuming week starts on Monday
    return Array.from({ length: 7 }).map((_, i) => addDays(start, i));
  };

  const getWeeksAroundCurrentDate = () => {
    const previousWeek = generateWeekDates(subDays(baseDate, 7));
    const currentWeek = generateWeekDates(new Date(baseDate));
    const nextWeek = generateWeekDates(addDays(baseDate, 7));
    const nextNextWeek = generateWeekDates(addDays(baseDate, 14));
    return [previousWeek, currentWeek, nextWeek, nextNextWeek];
  };

  const weeks = getWeeksAroundCurrentDate();

  return (
    <Carousel className="mt-10 w-[90%]">
      <CarouselContent className="">
        {weeks.map((week, weekIndex) => (
          <CarouselItem
            key={weekIndex}
            className="flex w-20 justify-between xl:justify-center xl:gap-x-6 xl:px-40"
          >
            {week.map((date, index) => (
              <CalendarDay
                key={index}
                setCurrentDate={setCurrentDate}
                day={format(date, "E")}
                date={date}
                dateNum={format(date, "d")}
                isCurrentDay={
                  format(date, "yyyy-MM-dd") ===
                  format(currentDate, "yyyy-MM-dd")
                }
              />
            ))}
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
