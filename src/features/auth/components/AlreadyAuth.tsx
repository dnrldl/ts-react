import { useAuth } from "features/auth/hooks/useAuth";

const AlreadyAuth = ({ children }: { children: React.ReactNode }) => {
  const { isLoggedIn } = useAuth();

  if (isLoggedIn) {
    // toast.info("Already Logined!");
    // TODO: guard routing
  }

  return <>{children}</>;
};

export default AlreadyAuth;
