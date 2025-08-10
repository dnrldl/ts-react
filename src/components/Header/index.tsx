import LoggedInUserSection from "components/Header/LoggedInUserSection";
import Button from "components/ui/Button/Button";
import { memo } from "react";
import { NavLink } from "react-router-dom";
import { useAuthStore } from "store/useAuthStore";
import styles from "./Header.module.scss";
import { User } from "lucide-react";

const Header = () => {
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div className={styles.menu}>
          <NavItem title="Home" path="/" />
          <NavItem title="Posts" path="/posts" />
        </div>
        <div className={styles.navRight}>
          <Button
            onClick={() => {
              console.log(useAuthStore.getState());
            }}
          >
            상태 체크
          </Button>

          <NavLink to={`/users/me`}>
            <User className={styles.userIcon} />
          </NavLink>
          {isLoggedIn && <LoggedInUserSection />}
        </div>
      </nav>
    </header>
  );
};

interface NavItemProps {
  title: string;
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
