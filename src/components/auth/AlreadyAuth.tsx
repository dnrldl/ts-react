import { toast } from "sonner";
import { useAuthStore } from "store/useAuthStore";

export const AlreadyAuth = ({ children }: { children: React.ReactNode }) => {
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);

  if (isLoggedIn) {
    toast.info("Already Logined!");
    // TODO: guard routing
  }

  return <>{children}</>;
};
