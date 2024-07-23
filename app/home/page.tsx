import AddHabitDialog from "@/components/add-habit-dialog";
import { DayCarousel } from "@/components/day-carousel";
import { useUser } from "@clerk/nextjs";
import HabitSection from "@/components/habit-section";
import CurrentView from "@/components/current-view";
import TodoSection from "@/components/todo-section";

function Dashboard() {
  return (
    <section className="max-h-screen overflow-y-auto flex flex-col items-center">
      <DayCarousel />
      <div className="container px-4 sm:px-10 lg:px-20 xl:px-32 flex flex-col mt-10 gap-6">
        <div className="space-y-6">
          <CurrentView />
          <TodoSection />
        </div>
        <HabitSection />
      </div>
    </section>
  );
}

export default Dashboard;
