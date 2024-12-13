import TicketForm from "@/components/TicketForm";

export default function NewEventPage() {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-6 py-8 text-white">
          <h2 className="text-2xl font-bold">Create New Analysis</h2>
          <p className="text-blue-100 mt-2">
            Fill out the form below to create a new analysis.
          </p>
        </div>

        <div className="p-6">
          <TicketForm mode="create" />
        </div>
      </div>
    </div>
  );
}
