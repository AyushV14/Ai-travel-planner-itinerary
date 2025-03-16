//app/dashboard/page.tsx
"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import { api } from "@/convex/_generated/api";
import Form from "./_components/Form";
import { useQuery } from "convex/react";

export default function DashboardPage() {
  const { user } = useUser();
  const userId = user?.id;
  const email = user?.emailAddresses[0].emailAddress;
  const name = user?.fullName;

  // Fetch user data from Convex
  const userData = useQuery(api.users.getUser, userId ? { userId } : "skip");

  // Show loading state while fetching data
  if (!userId || userData === undefined) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <nav className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <UserButton afterSignOutUrl="/" />
      </nav>
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Welcome to your Dashboard</h2>

        {/* Ensure userData is properly checked */}
        {userData && userData.userId ? (
          <p>Your profile is set up!</p>
        ) : (
          <Form userId={userId} name={name} email={email} />
        )}
      </div>
    </div>
  );
}

