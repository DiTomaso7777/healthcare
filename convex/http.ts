import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { Id } from "./_generated/dataModel";

const http = httpRouter();

http.route({
  path: "/getImage",
  method: "GET",
  handler: httpAction(async (ctx, request) => {
    const { searchParams } = new URL(request.url);
    const storageId = searchParams.get("storageId")! as Id<"_storage">;
    const blob = await ctx.storage.get(storageId);
    if (blob === null) {
      return new Response("File not found", {
        status: 404,
      });
    }

    // Set proper headers for file download
    return new Response(blob, {
      headers: {
        "Content-Type": blob.type || "application/octet-stream",
        "Content-Disposition": `attachment; filename="file"`, // Optionally set a default filename
      },
    });
  }),
});

export default http;
