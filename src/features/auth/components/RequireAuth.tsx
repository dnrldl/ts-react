import { useAuth } from "features/auth/hooks/useAuth";
import { Navigate, useLocation } from "react-router-dom";
import { toast } from "sonner";

interface RequireAuthProps {
  children: React.ReactNode;
}

const RequireAuth = ({ children }: RequireAuthProps) => {
  const { isLoggedIn } = useAuth();

  const location = useLocation();

  if (!isLoggedIn) {
    toast.info("Require Login!");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default RequireAuth;
