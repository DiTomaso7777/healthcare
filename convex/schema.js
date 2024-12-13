import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  tickets: defineTable({
    userId: v.string(),
    userName: v.string(),
    userMail: v.string(),
    userPhone: v.string(),
    fileUploadId: v.optional(v.id("_storage")),
    timestamp: v.number(),
    description: v.string(),
    status: v.union(
      v.literal("new"),
      v.literal("assigned"),
      v.literal("rejected"),
      v.literal("closed")
    ),
    paymentIntentId: v.optional(v.string()),
    admin: v.optional(v.boolean()),
    price: v.number()
  }).index("by_userId", ["userId"])
    .index("by_status", ["status"])
    .index("by_timestamp", ["timestamp"]),
  
    users: defineTable({
      email: v.string(),
      name: v.string(),
      phone: v.string(),
      userId: v.optional(v.string()),
      stripeConnectId: v.optional(v.string()),
    })
    .index("by_email", ["email"])
    .index("by_userId", ["userId"]),

    
});