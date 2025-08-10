import { useMutation } from "@tanstack/react-query";
import { register } from "api/auth";
import Button from "components/ui/Button/Button";
import { useRegisterForm } from "hooks/useRegisterForm";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import styles from "./RegisterForm.module.scss";

const RegisterForm = () => {
  const navigate = useNavigate();

  const { values, errors, refs, handleChange, handleSubmit } = useRegisterForm(
    (values) => {
      mutate(values);
    }
  );

  const { mutate, isPending } = useMutation({
    mutationFn: register,
    onSuccess: () => {
      toast.success("Register Success!");
      navigate("/login");
    },
    onError: () => {
      toast.error("Invalid Value!");
    },
  });

  const inputFields = [
    { name: "email", placeholder: "email", type: "email" },
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

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {inputFields.map((field) => (
        <div key={field.name} className={styles.field}>
          <input
            name={field.name}
            value={values[field.name]}
            onChange={handleChange}
            ref={refs[field.name]}
            placeholder={field.placeholder}
            type={field.type}
            className={styles.input}
          />
          {errors[field.name] && (
            <div className={styles.error}>{errors[field.name]}</div>
          )}
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
