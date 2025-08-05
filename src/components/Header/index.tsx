import { NavLink } from "react-router-dom";
import styles from "./Header.module.scss";
import { useAuthStore } from "store/useAuthStore";
import Button from "components/ui/Button/Button";
import { User } from "lucide-react";

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
          <Button
            onClick={() => {
              console.log(
                "localstorage = " + localStorage.getItem("accessToken")
              );
              console.log("zustand = " + useAuthStore.getState().accessToken);
            }}
          >
            check token
          </Button>
          <Button
            onClick={() => {
              localStorage.clear();
              clear();
            }}
          >
            clear tokens
          </Button>
          {accessToken ? (
            <>
              <LoginUser />
              <Button onClick={clear}>Logout</Button>
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
    <NavLink to="/mypage">
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
