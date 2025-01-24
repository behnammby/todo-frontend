import { useAuth } from "../../context/AuthProvider";

export function Header() {
  const { username, logout } = useAuth();

  return (
    <div className="flex justify-between px-4 py-2 border-b-2 border-b-gray-300 border-dashed">
      <h1 className="text-gray-800 font-bold text-xl uppercase">
        {username}'s To-Do
      </h1>
      <button
        className="flex-shrink-0 bg-amber-500 hover:bg-amber-700 border-amber-500 hover:border-amber-700 text-sm border-4 text-white py-1 px-2 rounded"
        type="button"
        onClick={logout}
      >
        Logout
      </button>
    </div>
  );
}
