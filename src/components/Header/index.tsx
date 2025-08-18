import LoggedInUserSection from "components/Header/LoggedInUserSection";
import UnLoggedInUserSection from "components/Header/UnLoggedInUserSection";
import { User } from "lucide-react";
import { memo } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useAuthStore } from "store/useAuthStore";
import styles from "./Header.module.scss";

const Header = () => {
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);
  const location = useLocation();

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div className={styles.menu}>
          <NavItem title="Home" path="/" />
          <NavItem title="Posts" path="/posts" />
        </div>
        <div className={styles.navRight}>
          <button
            onClick={() => {
              console.log(location);
            }}
          >
            상태 체크
          </button>
          <NavItem title={<User size={24} />} path="/users/me" />
          {isLoggedIn ? <LoggedInUserSection /> : <UnLoggedInUserSection />}
        </div>
      </nav>
    </header>
  );
};

interface NavItemProps {
  title: React.ReactNode;
  path: string;
}

export const NavItem = memo(({ title, path }: NavItemProps) => {
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
});

export default memo(Header);
