import { useAuth } from "../context/authContext";
import { useRouter } from "next/navigation";
import { SparklesPreview } from "./demo";
import { useState } from "react";
import LogoutWarningModal from "./LogoutWarningModal";

const Navbar = () => {
  const { logout } = useAuth();
  const router = useRouter();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const handleLogoutClick = () => {
    setIsLogoutModalOpen(true);
  };

  const handleConfirmLogout = () => {
    logout();
    router.push("/auth/login");
  };

  return (
    <nav className="flex justify-between items-center px-6 py-2 bg-transparent">
      <div className="flex-1 flex justify-center translate-x-12">
        <SparklesPreview title="Kanban Todo" />
      </div>

      <button
        onClick={handleLogoutClick}
        className="w-12 h-12 flex items-center justify-center bg-red-500/80 backdrop-blur-sm text-white rounded-full hover:bg-red-600 transition-all duration-300 shadow-lg active:scale-95 group"
        title="Logout"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className="group-hover:translate-x-1 transition-transform duration-300"
        >
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
          <polyline points="16 17 21 12 16 7"></polyline>
          <line x1="21" y1="12" x2="9" y2="12"></line>
        </svg>
      </button>

      <LogoutWarningModal 
        isOpen={isLogoutModalOpen} 
        onClose={() => setIsLogoutModalOpen(false)} 
        onConfirm={handleConfirmLogout} 
      />
    </nav>
  );
};

export default Navbar;
