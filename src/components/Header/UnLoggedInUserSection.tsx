import styles from "./Header.module.scss";
import { NavItem } from "components/Header";

const UnLoggedInUserSection = () => {
  return (
    <div className={styles.authSection}>
      <NavItem title="Login" path="/login" />
      <NavItem title="Register" path="/register" />
    </div>
  );
};

export default UnLoggedInUserSection;
