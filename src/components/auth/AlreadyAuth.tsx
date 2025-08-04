import { Navigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuthStore } from "store/useAuthStore";

export const AlreadyAuth = ({ children }: { children: React.ReactNode }) => {
  const accessToken = useAuthStore.getState().accessToken;

  if (accessToken) {
    toast.info("Already Logined!");
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};
