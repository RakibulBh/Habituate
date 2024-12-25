import DayCarousel from "@/components/day-carousel";
import Sidebar from "@/components/sidebar";
import { useAuth } from "@clerk/nextjs";
import { auth, currentUser } from "@clerk/nextjs/server";
import { getHabits } from "./actions";
import HabitsContainer from "@/components/habits-container";

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
      <section className="h-full flex-1">
        {/* TOP NAV */}
        <div className="h-16 bg-white" />

        {/* MAIN SECTION */}
        <div className="flex flex-col justify-center gap-6 mr-16">
          <div className="h-64 bg-primary rounded-xl p-4 flex">
            <div className="w-1/2" /> {/* Image */}
            <div className="space-y-2 w-1/2">
              <h1 className="font-bold text-6xl">Hello {user?.fullName}</h1>
              <div /> {/* Today's progress */}
            </div>
          </div>
          <DayCarousel />
          <div className="bg-red-100 mx-16 mb-16 h-80">
            <HabitsContainer />
          </div>
        </div>
        {/*  */}
      </section>
    </main>
  );
}
