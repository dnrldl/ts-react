import Button from "shared/components/ui/Button/Button";
import { useLoginForm } from "features/auth/hooks/useLoginForm";
import { Link } from "react-router-dom";
import styles from "./LoginForm.module.scss";

interface LoginFormProps {
  redirectPath: string;
}

const LoginForm = ({ redirectPath }: LoginFormProps) => {
  const {
    // useForm 객체
    register,
    watch,
    formState: { errors },

    // useMutation 객체
    isPending,

    // 실제 요청
    onSubmit,
  } = useLoginForm(redirectPath);

  return (
    <form onSubmit={onSubmit} className={styles.form}>
      <div className={styles.field}>
        <input
          {...register("email")}
          name="email"
          value={watch("email")}
          placeholder="email"
          type="text"
          className={styles.input}
        />
        {errors.email && (
          <div className={styles.error}>{errors.email.message}</div>
        )}
      </div>

      <div className={styles.field}>
        <input
          {...register("password")}
          name="password"
          value={watch("password")}
          placeholder="password"
          type="password"
          className={styles.input}
        />
        {errors.password && (
          <div className={styles.error}>{errors.password.message}</div>
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
