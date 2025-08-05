import { useMutation } from "@tanstack/react-query";
import { login } from "api/auth";
import Button from "components/ui/Button/Button";
import { useLoginForm } from "hooks/useLoginForm";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuthStore } from "store/useAuthStore";
import styles from "./LoginForm.module.scss";

const LoginForm = () => {
  const navigate = useNavigate();
  const setAccessToken = useAuthStore((state) => state.setAccessToken);

  const { mutate, isPending } = useMutation({
    mutationFn: login,
    onSuccess: (res) => {
      const { accessToken } = res.data;
      setAccessToken(accessToken);
      localStorage.setItem("accessToken", accessToken);

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
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.field}>
        <input
          name="email"
          value={values.email}
          onChange={handleChange}
          ref={refs.email}
          placeholder="email"
          type="email"
          className={styles.input}
        />
        {errors.email && <div className={styles.error}>{errors.email}</div>}
      </div>

      <div className={styles.field}>
        <input
          name="password"
          value={values.password}
          onChange={handleChange}
          ref={refs.password}
          placeholder="password"
          type="password"
          className={styles.input}
        />
        {errors.password && (
          <div className={styles.error}>{errors.password}</div>
        )}
      </div>

      <Button type="submit" disabled={isPending}>
        {isPending ? "Login..." : "Login"}
      </Button>
    </form>
  );
};

export default LoginForm;
