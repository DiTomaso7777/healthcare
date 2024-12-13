import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getUserById = query({
    args: {
        userId: v.string(),
    },
    handler: async (ctx, { userId }) => {
       const user = await ctx.db
            .query("users")
            .withIndex("by_userId", (q) => q.eq("userId", userId))
            .first();

        return user;
        },
});

export const updateUser = mutation({
    args: {
        userId: v.string(),
        name: v.string(),
        email: v.string(),
        phone: v.string(),
        // roles: v.union(v.literal("admin"), v.literal("user")), // Single role instead of array
    },
    handler: async (ctx, { userId, name, email, phone,  }) => {
        // Check if the user exists
        const existingUser = await ctx.db
            .query("users")
            .withIndex("by_userId", (q) => q.eq("userId", userId))
            .first();

        if (existingUser) {
            // Update the existing user
            await ctx.db.patch(existingUser._id, { 
                name, 
                email, 
                phone, 
                // roles, // Single role
            });
            return existingUser._id;
        }

        // Create a new user if not found
        const newUserId = await ctx.db.insert("users", {
            userId,
            name,
            email,
            phone,
            stripeConnectId: undefined,
        });

        return newUserId;
    },
});
