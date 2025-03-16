import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    userId: v.string(),
    name: v.string(),
    email: v.string(),
    location: v.string(),
    bio: v.string(),
  }).index("by_userId", ["userId"]),
});
