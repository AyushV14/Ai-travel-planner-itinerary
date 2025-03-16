//app/dashboard/_components/Form.tsx
"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

const Form = ({ userId, name, email }: { userId: string; name: string; email: string }) => {
  const [location, setLocation] = useState("");
  const [bio, setBio] = useState("");
  const createUser = useMutation(api.users.createUser);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createUser({ userId, name, email, location, bio });
    
    // Optimistic update instead of page refresh
    setSubmitted(true);
  };

  // If form is submitted, show a message instead
  if (submitted) {
    return <p>Profile created successfully!</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Location</label>
        <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} className="border p-2 w-full" required />
      </div>
      <div>
        <label className="block text-sm font-medium">Bio</label>
        <textarea value={bio} onChange={(e) => setBio(e.target.value)} className="border p-2 w-full" required />
      </div>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Submit
      </button>
    </form>
  );
};

export default Form;

