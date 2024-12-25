import DayCarousel from "@/components/day-carousel";
import Sidebar from "@/components/sidebar";
import { useAuth } from "@clerk/nextjs";
import { auth, currentUser } from "@clerk/nextjs/server";
import { getHabits } from "./actions";
import HabitsContainer from "@/components/habits-container";
import TopNav from "@/components/top-nav";

export default async function Home() {
  const { userId } = await auth();

  if (userId) {
    // Query DB for user specific information or display assets only to signed in users
    console.log("Hi user!");
  }

  const user = await currentUser();

  return (
    <main className="bg-[#F8F8F8] h-screen flex">
      <Sidebar />
      <section className="h-full flex flex-col flex-1">
        <TopNav />
        <div className="flex-1 bg-red-50 w-full"></div>
      </section>
    </main>
  );
}
