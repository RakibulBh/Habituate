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
    <Carousel className="mt-10 w-[90%]">
      <CarouselContent>
        {weeks.map((week, weekIndex) => (
          <CarouselItem
            key={weekIndex}
            className="flex w-20 justify-between xl:justify-center xl:gap-x-6 xl:px-40"
          >
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
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
