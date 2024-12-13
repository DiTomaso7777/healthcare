"use client";

import { Id } from "@/convex/_generated/dataModel";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { CalendarDays, Phone, Mail, FileText } from "lucide-react";
import { useParams } from "next/navigation";
import { useStorageUrl } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default function TicketPage() {

  const params = useParams();
  const ticket = useQuery(api.tickets.getById, {
    ticketId: params.id as Id<"tickets">,
  });

  
  const fileUrl = useStorageUrl(ticket?.fileUploadId);

  if (!ticket) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Left Column - Ticket Details */}
              <div className="space-y-8 border border-gray-200 rounded-lg bg-blue-200 p-6">
              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-gray-700">
                  Ticket
                </h3>
                <p className=" text-gray-900 mt-2">
                  #{ticket._id}
                </p>
              </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                    <div className="flex items-center text-gray-600 mb-1">
                      <CalendarDays className="w-5 h-5 mr-2 text-blue-600" />
                      <span className="text-sm font-medium">Created Date</span>
                    </div>
                    <p className="text-gray-900">
                      {new Date(ticket.timestamp).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                    <div className="flex items-center text-gray-600 mb-1">
                      <Mail className="w-5 h-5 mr-2 text-blue-600" />
                      <span className="text-sm font-medium">Email</span>
                    </div>
                    <p className="text-gray-900">{ticket.userMail}</p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                    <div className="flex items-center text-gray-600 mb-1">
                      <Phone className="w-5 h-5 mr-2 text-blue-600" />
                      <span className="text-sm font-medium">Phone</span>
                    </div>
                    <p className="text-gray-900">{ticket.userPhone}</p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                    <div className="flex items-center text-gray-600 mb-1">
                      <FileText className="w-5 h-5 mr-2 text-blue-600" />
                      <span className="text-sm font-medium">Status</span>
                    </div>
                    <p className="text-gray-900 capitalize">{ticket.status}</p>
                  </div>
                </div>

                {/* Additional Ticket Information */}
                <div className="bg-blue-50 border border-blue-100 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-blue-900 mb-2">
                    Ticket Information
                  </h3>
                  <ul className="space-y-2 text-blue-700">
                    <li>Created by: {ticket.userName}</li>
                    <li>Price: £{ticket.price.toFixed(2)}</li>
                    {ticket.admin && <li>• Assigned to Admin</li>}
                  </ul>
                </div>
              </div>

              {/* Right Column - File Download & Actions */}
              <div>
                <div className="sticky top-8 space-y-4">
                  {fileUrl && (
                    <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                      <h3 className="text-lg font-semibold mb-4">
                        Attached File
                      </h3>
                      <Button
                        onClick={() => window.open(fileUrl, '_blank')}
                        className="w-full bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white"
                      >
                        Download File
                      </Button>
                    </div>
                  )}
                 


                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}