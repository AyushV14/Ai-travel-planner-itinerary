import { mutation, query } from "./_generated/server";

export const getUser = query(async ({ db }, { userId }: { userId: string }) => {
  return await db
    .query("users")
    .withIndex("by_userId", (q) => q.eq("userId", userId))
    .first() || null;  
});

export const createUser = mutation(
  async ({ db }, { userId, name, email, location, bio }: 
  { userId: string; name: string; email: string; location: string; bio: string }) => {
  
    const existingUser = await db
      .query("users")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .first();

    if (existingUser) return; 

    await db.insert("users", { userId, name, email, location, bio });
  }
);
