import { auth } from "@clerk/nextjs/server"; 
import { redirect } from "next/navigation";
import HomePage from "./_components/Homepage";

export default function Home() {
  const { userId } = auth(); 

  if (userId) {
    redirect("/dashboard");
  }

  return (
    <div>
      <HomePage/>
    </div>
  );
}
