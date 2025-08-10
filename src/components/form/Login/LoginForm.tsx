import { useMutation } from "@tanstack/react-query";
import { login } from "api/auth";
import Button from "components/ui/Button/Button";
import { useLoginForm } from "hooks/useLoginForm";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuthStore } from "store/useAuthStore";
import styles from "./LoginForm.module.scss";

interface LoginFormProps {
  redirectPath: string;
}

const LoginForm = ({ redirectPath }: LoginFormProps) => {
  const navigate = useNavigate();
  const setAccessToken = useAuthStore((s) => s.setAccessToken);
  const setUserInfo = useAuthStore((s) => s.setUserInfo);

  const { mutate, isPending } = useMutation({
    mutationFn: login,
    onSuccess: (res) => {
      setAccessToken(res.accessToken);
      setUserInfo({
        userId: res.userId,
        nickname: res.nickname,
        email: res.email,
        profileImageUrl: res.profileImageUrl,
        role: res.role,
      });
      localStorage.setItem("accessToken", res.accessToken);

      toast.success("Login Success!");
      navigate(redirectPath, { replace: true });
    },
    onError: (e) => {
      console.log(e);
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

      <div className={styles.bottom}>
        <div className={styles.left}>
          <label>
            <input type="checkbox" />
            Remember me
          </label>
        </div>
        <Link to="/register" className={styles.right}>
          Register
        </Link>
      </div>

      <Button type="submit" disabled={isPending}>
        {isPending ? "Login..." : "Login"}
      </Button>
    </form>
  );
};

export default LoginForm;
