import { NavLink } from "react-router-dom";
import styles from "./Header.module.scss";
import { useAuthStore } from "store/useAuthStore";
import Button from "components/ui/Button/Button";

const Header = () => {
  const { accessToken, clear } = useAuthStore();

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div className={styles.menu}>
          <NavItem title="Home" path="/" />
          <NavItem title="Posts" path="/posts" />
        </div>
        <div className={styles.navRight}>
          {accessToken ? (
            <Button onClick={() => clear()}>Logout</Button>
          ) : (
            <div className={styles.authSection}>
              <NavItem title="Login" path="/login" />
              <NavItem title="Register" path="/register" />
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

interface NavItemProps {
  title: string;
  path: string;
}

const NavItem = ({ title, path }: NavItemProps) => {
  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        isActive ? `${styles.link} ${styles.active}` : styles.link
      }
    >
      {title}
    </NavLink>
  );
};

export default Header;
