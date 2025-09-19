import { LogIn } from "lucide-react";
import styles from "./Header.module.scss";
import { useLocation } from "react-router-dom";
import { NavItem } from "shared/components/header/Header";

const UnLoggedInUserSection = () => {
  const location = useLocation();

  return (
    <div className={styles.authSection}>
      <NavItem
        title={<LogIn size={24} />}
        path={`/login?redirectPath=${encodeURIComponent(location.pathname)}`}
      />
    </div>
  );
};

export default UnLoggedInUserSection;
