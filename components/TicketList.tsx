"use client";

import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { Download, User, CalendarDays } from "lucide-react";
import Loader from "./Loader";
import "@/components/ticketlist.css";
import Link from "next/link";

function TicketList() {
  const tickets = useQuery(api.tickets.get);

  if (!tickets) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader />
      </div>
    );
  }

  const newTickets = tickets
    .filter((ticket) => ticket.status === "new")
    .sort((a, b) => a.timestamp - b.timestamp)
    .map((ticket) => ({
      id: ticket._id,
      title: ticket.userName,
      timestamp: ticket.timestamp,
      status: ticket.status,
      fileUploadId: ticket.fileUploadId,
    }));

  return (
    <div className="ticket-list">
      <div className="ticket-section">
        <h2 className="ticket-section-title">New Tickets</h2>
        {newTickets.map((ticket) => {
         
          return (
            <Link href={`/ticket/${ticket.id}`}  key={ticket.id} className="ticket-row">
              <div className="ticket-field flex items-center">
                <User className="w-5 h-5 text-gray-400 mr-2" />
                <span>{ticket.title}</span>
              </div>

              <div className="ticket-field flex items-center">
                <CalendarDays className="w-5 h-5 text-gray-400 mr-2" />
                <span>
                  {new Date(ticket.timestamp).toLocaleDateString()}{" "}
                  {new Date(ticket.timestamp).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>

              <div className="ticket-field">
                <span className={`ticket-status ticket-status-${ticket.status}`}>
                  {ticket.status}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default TicketList;