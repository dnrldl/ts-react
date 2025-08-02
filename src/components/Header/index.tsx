import { NavLink } from "react-router-dom";
import styles from "./Header.module.scss";

const Header = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div className={styles.menu}>
          <NavItem title="Home" path="/" />
          <NavItem title="Posts" path="/posts" />
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
