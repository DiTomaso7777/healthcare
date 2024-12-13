import { v } from "convex/values"
import { mutation, query } from "./_generated/server"

export const getUrl = query({
    args: { storageId: v.id("_storage") },
    handler: async (ctx, { storageId }) => {
        return await ctx.storage.getUrl(storageId)
        },
})

//Generate upload url
export const generateUploadUrl = mutation(async (ctx) => {
    return await ctx.storage.generateUploadUrl();
})

//Generate download url
export const getDownloadUrls = query({
  args: { storageIds: v.array(v.id("_storage")) },
  handler: async (ctx, { storageIds }) => {
    const urls = await Promise.all(
      storageIds.map(async (storageId) => {
        const url = await ctx.storage.getUrl(storageId);
        return [storageId, url];
      })
    );
    return Object.fromEntries(urls);
  },
});

// Update Ticket File

export const updateTicketFile = mutation({
    args: {
      ticketId: v.id("tickets"),
      fileId: v.union(v.id("_storage"), v.null()),
    },
    handler: async (ctx, { ticketId, fileId }) => {
      await ctx.db.patch(ticketId, {
        fileUploadId: fileId ?? undefined,
      });
    },
  });

  //delete file

    export const deleteFile = mutation({
        args: { fileId: v.id("_storage") },
        handler: async (ctx, { fileId }) => {
        await ctx.storage.delete(fileId);
        },
    });