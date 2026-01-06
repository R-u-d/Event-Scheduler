import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { loggedIn, logout } = useContext(AuthContext);

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between">
      <div className="flex gap-4">
        <Link to="/">Home</Link>
        {loggedIn && <Link to="/create-event">Create Event</Link>}
      </div>
      <div>
        {loggedIn ? (
          <button
            onClick={logout}
            className="bg-red-600 px-2 py-1 rounded"
          >
            Logout
          </button>
        ) : (
          <>
            <Link to="/login" className="mr-2">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
}
