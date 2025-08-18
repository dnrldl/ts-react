import { NavItem } from "components/Header";
import { LogIn } from "lucide-react";
import styles from "./Header.module.scss";

const UnLoggedInUserSection = () => (
  <div className={styles.authSection}>
    <NavItem title={<LogIn size={24} />} path="/login" />
  </div>
);

export default UnLoggedInUserSection;
