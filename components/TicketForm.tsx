"use client";

import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";
import { useRef, useState, useTransition } from "react";
import { Id } from "@/convex/_generated/dataModel";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useStorageUrl } from "@/lib/utils";

const formSchema = z.object({
  userName: z.string().min(2, "User name must be at least 2 characters"),
  userMail: z.string().email("Invalid email address"),
  userPhone: z
    .string()
    .regex(
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
      "Invalid phone number"
    ),
  description: z.string().min(10, "Description must be at least 10 characters"),
  price: z.coerce
    .number()
    .min(0, "Price must be 0 or greater")
    .max(10000, "Price cannot exceed 10,000"),
});

type FormData = z.infer<typeof formSchema>;

interface InitialTicketData {
  _id: Id<"tickets">;
  userName: string;
  userMail: string;
  userPhone: string;
  description: string;
  price: number;
  fileUploadId?: Id<"_storage">;
}

interface TicketFormProps {
  mode: "create" | "edit";
  initialData?: InitialTicketData;
}

export default function TicketForm({ mode, initialData }: TicketFormProps) {
  const { user } = useUser();
  const createTicket = useMutation(api.tickets.create);
  const updateTicket = useMutation(api.tickets.updateTicket);
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const currentFileUrl = useStorageUrl(initialData?.fileUploadId);

  // File upload
  const fileInput = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const generateUploadUrl = useMutation(api.storage.generateUploadUrl);


  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userName: initialData?.userName ?? "",
      userMail: initialData?.userMail ?? "",
      userPhone: initialData?.userPhone ?? "",
      description: initialData?.description ?? "",
      price: initialData?.price ?? 0,
    },
  });

  async function onSubmit(values: FormData) {
    if (!user?.id) {
      toast({
        variant: "destructive",
        title: "Authentication Required",
        description: "Please log in to create or update a ticket.",
      });
      return;
    }

    startTransition(async () => {
      try {
        let fileUploadId: Id<"_storage"> | undefined = undefined;

        if (file) {
          const allowedTypes = [
            "application/pdf",
            "application/msword",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            "text/plain",
          ];
          if (!allowedTypes.includes(file.type)) {
            setFileError("Invalid file type. Please upload PDF, Word, or TXT files.");
            return;
          }

          if (file.size > 5 * 1024 * 1024) {
            setFileError("File size cannot exceed 5MB.");
            return;
          }

          fileUploadId = await handleFileUpload(file);
        }

        if (mode === "create") {
          const ticketId = await createTicket({
            ...values,
            userId: user.id,
            timestamp: Date.now(),
            fileUploadId,
          });

          toast({
            title: "Ticket Created",
            description: "Your ticket has been successfully created.",
          });

          router.push(`/ticket/${ticketId}`);
        } else {
          if (!initialData) throw new Error("Initial ticket data is required for updates");

          await updateTicket({
            ticketId: initialData._id,
            ...values,
            fileUploadId: fileUploadId ?? initialData.fileUploadId,
          });

          toast({
            title: "Ticket Updated",
            description: "Your ticket has been successfully updated.",
          });

          router.push(`/ticket/${initialData._id}`);
        }
      } catch (error) {
        console.error("Failed to handle ticket:", error);
        toast({
          variant: "destructive",
          title: "Submission Error",
          description: "There was a problem processing your ticket. Please try again.",
        });
      }
    });
  }

  async function handleFileUpload(file: File): Promise<Id<"_storage"> | undefined> {
    try {
      const postUrl = await generateUploadUrl();
      const result = await fetch(postUrl, {
        method: "POST",
        headers: { "Content-Type": file.type },
        body: file,
      });
      const { storageId } = await result.json();
      return storageId as Id<"_storage">;
    } catch (error) {
      console.error("Failed to upload file:", error);
      toast({
        variant: "destructive",
        title: "File Upload Failed",
        description: "Could not upload the file. Please try again.",
      });
      return undefined;
    }
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileError(null);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* User Name */}
        <FormField
          control={form.control}
          name="userName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>User Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* User Email */}
        <FormField
          control={form.control}
          name="userMail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter your email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* User Phone */}
        <FormField
          control={form.control}
          name="userPhone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input placeholder="Enter your phone number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Description */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Describe your issue or request" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Price */}
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Enter price" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* File Upload */}
        <FormItem>
          <FormLabel>File Upload</FormLabel>
          <FormControl>
            <input
              type="file"
              ref={fileInput}
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
            />
          </FormControl>
          {fileError && <p className="text-red-500 text-sm">{fileError}</p>}
          {currentFileUrl && (
            <p className="text-sm text-gray-500">
              Current File: <a href={currentFileUrl} target="_blank" rel="noopener noreferrer" className="text-indigo-500 underline">View File</a>
            </p>
          )}
        </FormItem>

        {/* Submit Button */}
        <Button type="submit" disabled={isPending} className="w-full">
          {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : mode === "create" ? "Create Ticket" : "Update Ticket"}
        </Button>
      </form>
    </Form>
  );
}