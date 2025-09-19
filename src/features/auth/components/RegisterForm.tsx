import Button from "shared/components/ui/Button/Button";
import { Link } from "react-router-dom";
import styles from "./RegisterForm.module.scss";
import { ErrorMessage } from "@hookform/error-message";
import { useRegisterForm } from "features/auth/hooks/useRegisterForm";
import { RegisterFormData } from "features/auth/types";

const RegisterForm = () => {
  const {
    // useForm 객체
    register,
    formState: { errors },
    watch,
    getValues,

    // useMutation 객체
    isPending,

    // 실제 요청
    onSubmit,
  } = useRegisterForm();

  const inputFields = [
    { name: "email", placeholder: "email", type: "text" },
    { name: "password", placeholder: "password", type: "password" },
    {
      name: "confirmPassword",
      placeholder: "confirm password",
      type: "password",
    },
    { name: "nickname", placeholder: "nickname", type: "text" },
    { name: "firstName", placeholder: "first name", type: "text" },
    { name: "lastName", placeholder: "last name", type: "text" },
    { name: "phoneNumber", placeholder: "phone number", type: "tel" },
    { name: "gender", placeholder: "gender", type: "text" },
    { name: "birth", placeholder: "birth", type: "date" },
  ] as const;

  const a = getValues();
  console.log(a);

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      {inputFields.map((field) => (
        <div key={field.name} className={styles.field}>
          <label htmlFor={field.name}></label>
          {field.placeholder}
          <input
            {...register(field.name)}
            name={field.name}
            value={watch([field.name])}
            placeholder={field.placeholder}
            type={field.type}
            className={styles.input}
          />
          {/* {errors[field.name] && (
            <div className={styles.error}>{errors[field.name]?.message}</div>
          )} */}
          <ErrorMessage
            errors={errors}
            name={field.name as keyof RegisterFormData}
          />
        </div>
      ))}

      <div className={styles.bottom}>
        <div className={styles.left}></div>
        <Link to="/Login" className={styles.right}>
          Login
        </Link>
      </div>

      <Button type="submit" disabled={isPending}>
        {isPending ? "Register..." : "Register"}
      </Button>
    </form>
  );
};

export default RegisterForm;
