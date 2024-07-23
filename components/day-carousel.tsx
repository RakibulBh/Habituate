"use client";
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
import { useDateStore } from "@/store/date";

export function DayCarousel() {
  const date = useDateStore((state) => state.date);

  const generateWeekDates = (startDate: Date) => {
    const start = startOfWeek(startDate, { weekStartsOn: 1 }); // Assuming week starts on Monday
    return Array.from({ length: 7 }).map((_, i) => addDays(start, i));
  };

  const getWeeksAroundCurrentDate = () => {
    const previousWeek = generateWeekDates(subDays(date.baseDate, 7));
    const currentWeek = generateWeekDates(date.baseDate);
    const nextWeek = generateWeekDates(addDays(date.baseDate, 7));
    const nextNextWeek = generateWeekDates(addDays(date.baseDate, 14));
    return [previousWeek, currentWeek, nextWeek, nextNextWeek];
  };

  const weeks = getWeeksAroundCurrentDate();

  return (
    <Carousel
      defaultValue={1}
      className="mt-6 w-[20rem] sm:w-[30rem] md:w-[45rem]"
    >
      <CarouselContent>
        {weeks.map((week, weekIndex) => (
          <CarouselItem key={weekIndex} className="flex justify-center gap-x-2">
            {week.map((currDate, index) => (
              <CalendarDay
                key={index}
                day={format(currDate, "E")}
                calendarDate={currDate}
                dateNum={format(currDate, "d")}
                isCurrentDay={
                  format(currDate, "yyyy-MM-dd") === date.currentDate
                }
              />
            ))}
          </CarouselItem>
        ))}
      </CarouselContent>
      {/* Uncomment these if you want navigation buttons */}
      {/* <CarouselPrevious />
      <CarouselNext /> */}
    </Carousel>
  );
}
