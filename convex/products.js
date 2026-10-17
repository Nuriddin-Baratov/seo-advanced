// convex/products.js
import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// 1. Barcha mahsulotlarni olish (rasm URL har biri uchun generatsiya qilinadi)
export const get = query({
  args: {},
  handler: async (ctx) => {
    const products = await ctx.db.query("products").order("desc").collect();

    return Promise.all(
      products.map(async (product) => ({
        ...product,
        imageUrl: product.imageId ? await ctx.storage.getUrl(product.imageId) : null,
      }))
    );
  },
});

// 2. Rasm yuklash uchun maxsus URL olish
export const generateUploadUrl = mutation(async (ctx) => {
  return await ctx.storage.generateUploadUrl();
});

// 3. Yangi mahsulot saqlash
export const create = mutation({
  args: {
    title: v.string(),
    price: v.number(),
    description: v.string(),
    imageId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("products", {
      title: args.title,
      price: args.price,
      description: args.description,
      imageId: args.imageId,
    });
  },
});