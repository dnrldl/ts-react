import { NavLink } from "react-router-dom";
import styles from "./Header.module.scss";
import { useAuthStore } from "store/useAuthStore";
import Button from "components/ui/Button/Button";
import { User } from "lucide-react";
import { memo } from "react";
import { toast } from "sonner";

const Header = () => {
  const accessToken = useAuthStore((state) => state.accessToken);
  const clear = useAuthStore((state) => state.clear);

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

          {accessToken ? (
            <>
              <LoginUser />
              <Button
                onClick={() => {
                  clear();
                  toast.success("Logout Success!");
                }}
              >
                Logout
              </Button>
            </>
          ) : (
            <AuthSection />
          )}
        </div>
      </nav>
    </header>
  );
};

const LoginUser = () => (
  <div className={styles.loginUserSection}>
    <NavLink to="/users/me">
      <User className={styles.userIcon} />
    </NavLink>
  </div>
);

const AuthSection = () => (
  <div className={styles.authSection}>
    <NavItem title="Login" path="/login" />
    <NavItem title="Register" path="/register" />
  </div>
);

interface NavItemProps {
  title: string;
  path: string;
}

const NavItem = memo(({ title, path }: NavItemProps) => {
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
