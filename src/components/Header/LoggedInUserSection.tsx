import { logout } from "api/auth";
import Button from "components/ui/Button/Button";
import { toast } from "sonner";
import { useAuthStore } from "store/useAuthStore";
import styles from "./Header.module.scss";

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
    <>
      <LoggedInUser />
      <Button onClick={handleLogout}>Logout</Button>
    </>
  );
};

const LoggedInUser = () => <div className={styles.loginUserSection}></div>;

export default LoggedInUserSection;
