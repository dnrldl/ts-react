import { useMutation } from "@tanstack/react-query";
import { login } from "api/auth";
import Button from "components/ui/Button/Button";
import { useLoginForm } from "hooks/useLoginForm";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuthStore } from "store/useAuthStore";

const LoginForm = () => {
  const navigate = useNavigate();
  const setAccessToken = useAuthStore((state) => state.setAccessToken);

  const { mutate, isPending } = useMutation({
    mutationFn: login,
    onSuccess: (res) => {
      const { accessToken } = res.data;
      setAccessToken(accessToken); // zustand
      localStorage.setItem("accessToken", accessToken); // localstorage

      toast.success("Login Success!");
      navigate("/");
    },
    onError: () => {
      toast.error("Invalid Value!");
    },
  });

  const { values, errors, refs, handleChange, handleSubmit } = useLoginForm(
    (values) => {
      mutate(values);
    }
  );

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="email"
        value={values.email}
        onChange={handleChange}
        ref={refs.email}
        placeholder="email"
      />
      {errors.email && <div className="error">{errors.email}</div>}

      <input
        name="password"
        value={values.password}
        onChange={handleChange}
        ref={refs.password}
        placeholder="password"
        type="password"
      />
      {errors.password && <div className="error">{errors.password}</div>}

      <Button type="submit">{isPending ? "..." : "Login"}</Button>
    </form>
  );
};

export default LoginForm;
