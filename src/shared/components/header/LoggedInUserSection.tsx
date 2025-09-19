import { LogOut } from "lucide-react";
import { toast } from "sonner";
import styles from "./Header.module.scss";
import { useAuth } from "features/auth/hooks/useAuth";

const LoggedInUserSection = () => {
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();

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
