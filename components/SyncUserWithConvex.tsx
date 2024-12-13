"use client";

import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { useEffect } from "react";
import { api } from "@/convex/_generated/api";

export default function SyncUserWithConvex() {
  const { user } = useUser();
  const updateUser = useMutation(api.users.updateUser);

  useEffect(() => {
    if (!user) return;

    const syncUser = async () => {
      try {
        await updateUser({
          userId: user.id,
          name: user.fullName ?? "Default Name", // Ensure a default name fallback
          email: user.emailAddresses[0]?.emailAddress ?? "",
          phone: user.phoneNumbers[0]?.phoneNumber ?? "",// Ensure a default role fallback
        });
      } catch (error) {
        console.error("Error syncing user:", error);
      }
    };

    syncUser();
  }, [user, updateUser]);

  return null;
}
