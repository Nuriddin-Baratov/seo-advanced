// convex/schema.js
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  products: defineTable({
    title: v.string(),
    price: v.number(),
    description: v.string(),
    imageId: v.optional(v.string()),
  }),
});