import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div
      style={{ backgroundColor: "black" }}
      className="flex justify-center items-center flex-col gap-10 w-full h-screen"
    >
      <SignIn />
    </div>
  );
}
