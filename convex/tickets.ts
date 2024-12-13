import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const create = mutation({
  args: {
    userId: v.string(),
    userName: v.string(),
    userMail: v.string(),
    userPhone: v.string(),
    fileUploadId: v.optional(v.id("_storage")),
    price: v.number(),
    timestamp:  v.optional(v.number()),
    description: v.string(),
  },
  handler: async (ctx, args) => {
      // Use provided timestamp or fetch the current timestamp
      const currentTimestamp = args.timestamp ?? Date.now();

    const ticketId = await ctx.db.insert("tickets", {
      userId: args.userId,
      userName: args.userName,
      userMail: args.userMail,
      userPhone: args.userPhone,
      fileUploadId: args.fileUploadId,
      price: args.price,
      status: "new",
      timestamp: currentTimestamp,
      description: args.description
    });
    return ticketId;
  },
});

// update ticket

export const updateTicket = mutation({
  args: {
    ticketId: v.id("tickets"),
    userId: v.optional(v.string()),
    userName: v.optional(v.string()),
    userMail: v.optional(v.string()),
    userPhone: v.optional(v.string()),
    fileUploadId: v.optional(v.id("_storage")),
    price: v.optional(v.number()),
    timestamp: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const { ticketId, userId, userName, userMail, userPhone, fileUploadId, price, timestamp } = args;

     const currentTimestamp = Date.now();      // Fetch current timestamp

     const fieldsToUpdate = {
        userId,
       timestamp: currentTimestamp,       // Add the current timestamp to the update
     };

    return await ctx.db.patch(ticketId, {
      userId,
      userName,
      userMail,
      userPhone,
      fileUploadId,
      price,
      timestamp,
    });
  },
});

export const getById = query({
  args: {
    ticketId: v.optional(v.id("tickets")), // Make ticketId optional if needed
  },
  handler: async (ctx, { ticketId }) => {
    if (!ticketId) {
      throw new Error("ticketId is required");
    }
    const ticket = await ctx.db.get(ticketId);
    if (!ticket) return null;

    return ticket;
  },
});

// Query to get tickets with status "new"
export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("tickets")
      .filter((q) => q.eq(q.field("status"), "new"))
      .collect();
  },
});

// Query to get a user's ticket by userId
export const getUserTickets = query({
  args: {
    userId: v.string(),
  },
  handler: async (ctx, { userId }) => {
    return await ctx.db
      .query("tickets")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .collect();
  },
});

// Query to get a ticket with its details
export const getTicketWithDetails = query({
  args: { ticketId: v.id("tickets") },
  handler: async (ctx, { ticketId }) => {
    const ticket = await ctx.db.get(ticketId);
    if (!ticket) return null;

    return ticket;
  },
});

// Query to get tickets with specific statuses
export const getTicketsByStatus = query({
  args: { status: v.union(
    v.literal("new"),
    v.literal("assigned"),
    v.literal("rejected"),
    v.literal("closed")
  ) },
  handler: async (ctx, { status }) => {
    return await ctx.db
      .query("tickets")
      .withIndex("by_status", (q) => q.eq("status", status))
      .collect();
  },
});

// Mutation to update the status of a ticket
export const updateTicketStatus = mutation({
  args: {
    ticketId: v.id("tickets"),
    status: v.union(
      v.literal("new"),
      v.literal("assigned"),
      v.literal("rejected"),
      v.literal("closed"),
    ),
  },
  handler: async (ctx, { ticketId, status }) => {
    await ctx.db.patch(ticketId, { status });
  },
});
