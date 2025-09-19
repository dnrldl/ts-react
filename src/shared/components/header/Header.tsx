import { User } from "lucide-react";
import { memo } from "react";
import { NavLink } from "react-router-dom";
import { useUserStore } from "shared/stores/userStore";
import styles from "./Header.module.scss";
import { useAuth } from "features/auth/hooks/useAuth";
import LoggedInUserSection from "shared/components/header/LoggedInUserSection";
import UnLoggedInUserSection from "shared/components/header/UnLoggedInUserSection";

const Header = () => {
  const { isLoggedIn } = useAuth();

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div className={styles.menu}>
          <NavItem title="Home" path="/" />
          <NavItem title="Posts" path="/posts" />
        </div>
        <div className={styles.navRight}>
          <NavItem title={<User size={24} />} path="/users/me" />
          {isLoggedIn ? <LoggedInUserSection /> : <UnLoggedInUserSection />}
        </div>

        <button
          onClick={() => {
            console.log("isLoggedIn", isLoggedIn);
          }}
        >
          로그인 상태 확인
        </button>
        <button
          onClick={() => {
            const userInfo = useUserStore.getState().userInfo;
            console.log(userInfo);
          }}
        >
          유저 스토어 상태 확인
        </button>
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
