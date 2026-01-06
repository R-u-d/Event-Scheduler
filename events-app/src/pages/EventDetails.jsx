import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function EventDetails() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`http://localhost:3001/api/events/${id}`)
      .then(res => {
        if (!res.ok) throw new Error("Event not found");
        return res.json();
      })
      .then(setEvent)
      .catch(err => setError(err.message));
  }, [id]);

  if (error) return <p className="p-4 text-red-500 text-center">{error}</p>;
  if (!event) return <p className="p-4 text-gray-500 text-center">Loading event details...</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white border rounded-lg shadow-md mt-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">{event.title}</h1>
      <p className="text-gray-500 mb-1">{new Date(event.date).toLocaleDateString()}</p>
      <p className="text-gray-600 mb-4">{event.location}</p>
      <p className="text-gray-700">{event.description}</p>
    </div>
  );
}
