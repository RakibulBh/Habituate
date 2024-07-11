import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="bg-tertiary flex justify-center items-center flex-col gap-10 w-full h-screen">
      <SignUp />
    </div>
  );
}
