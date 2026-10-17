// convex/tasks.js
import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// 1. Barcha vazifalarni olish (rasm URL lari bilan)
export const get = query({
  args: {},
  handler: async (ctx) => {
    const tasks = await ctx.db.query("tasks").order("desc").collect();
    
    // Har bir vazifa uchun rasming URL'ini generatsiya qilish
    return Promise.all(
      tasks.map(async (task) => ({
        ...task,
        imageUrl: task.imageId ? await ctx.storage.getUrl(task.imageId) : null,
      }))
    );
  },
});

// 2. Rasm yuklash uchun maxsus URL olish (Upload URL)
export const generateUploadUrl = mutation(async (ctx) => {
  return await ctx.storage.generateUploadUrl();
});

// 3. Yangi vazifa (va rasm ID) saqlash
export const create = mutation({
  args: { 
    text: v.string(), 
    imageId: v.optional(v.string()) 
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("tasks", {
      text: args.text,
      imageId: args.imageId,
    });
  },
});