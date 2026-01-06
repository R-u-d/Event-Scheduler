import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3001/api/events");
      if (!res.ok) throw new Error("Failed to fetch events");
      const data = await res.json();
      setEvents(data.results || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();

    // Optional: refresh events every 10 seconds
    const interval = setInterval(fetchEvents, 10000);
    return () => clearInterval(interval);
  }, []);

  if (loading) return <p className="p-4 text-center text-gray-500">Loading events...</p>;
  if (error) return <p className="p-4 text-red-500 text-center">{error}</p>;
  if (!events.length) return <p className="p-4 text-center text-gray-500">No events found</p>;

  return (
    <div className="p-4 max-w-6xl mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {events.map(event => (
        <Link
          key={event.id}
          to={`/events/${event.id}`}
          className="group block border rounded-lg shadow hover:shadow-lg transition-shadow duration-300 bg-white overflow-hidden"
        >
          <div className="p-4 flex flex-col h-full">
            <h2 className="text-xl font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
              {event.title}
            </h2>
            <p className="text-gray-500 mt-1 text-sm">{new Date(event.date).toLocaleDateString()}</p>
            <p className="text-gray-600 mt-2 flex-grow">{event.description.length > 80 ? event.description.slice(0, 80) + "…" : event.description}</p>
            <p className="text-gray-400 mt-2 text-sm italic">{event.location}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
