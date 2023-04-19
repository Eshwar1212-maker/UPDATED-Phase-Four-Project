import { useUser } from "../context/AuthContext";

function LogoutButton() {
  const { logout } = useUser();

  return (
    <button onClick={logout} className="bg-red-500 text-white p-2 rounded-md">
      Logout
    </button>
  );
}
