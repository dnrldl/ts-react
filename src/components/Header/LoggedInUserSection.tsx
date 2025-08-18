import styles from "./Header.module.scss";
import { logout } from "api/auth";
import { LogOut } from "lucide-react";
import { toast } from "sonner";
import { useAuthStore } from "store/useAuthStore";

const LoggedInUserSection = () => {
  const clear = useAuthStore((s) => s.clear);

  const handleLogout = async () => {
    try {
      await logout();
      clear();
    } catch (error) {
      console.error("logout: Error ", error);
    }

    toast.success("Logout Success!");
  };

  return (
    <div className={styles.authSection}>
      <button onClick={handleLogout} className={styles.userIcon}>
        <LogOut size={24} />
      </button>
    </div>
  );
};

export default LoggedInUserSection;
