import { Navigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuthStore } from "store/useAuthStore";

interface RequireAuthProps {
  children: React.ReactNode;
}

const RequireAuth = ({ children }: RequireAuthProps) => {
  const accessToken = useAuthStore.getState().accessToken;

  if (!accessToken) {
    toast.info("Require Login!");
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default RequireAuth;
