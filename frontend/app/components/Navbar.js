import { useAuth } from "../context/authContext";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/auth/login");
  };

  return (
    <nav className="flex justify-between items-center px-6 py-3 bg-header-bg shadow">
      <h1 className="text-xl font-bold">Kanban Todo</h1>

      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
