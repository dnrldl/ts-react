import { useMutation } from "@tanstack/react-query";
import { register } from "api/auth";
import Button from "components/ui/Button/Button";
import { useRegisterForm } from "hooks/useRegisterForm";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const RegisterForm = () => {
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: register,
    onSuccess: (res) => {
      toast.success("Register Success!");
      navigate("/login");
    },
    onError: () => {
      toast.error("Invalid Value!");
    },
  });

  const { values, errors, refs, handleChange, handleSubmit } = useRegisterForm(
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
      <input
        name="nickname"
        value={values.nickname}
        onChange={handleChange}
        ref={refs.nickname}
        placeholder="nickname"
        type="nickname"
      />
      {errors.password && <div className="error">{errors.password}</div>}
      <input
        name="firstName"
        value={values.firstName}
        onChange={handleChange}
        ref={refs.firstName}
        placeholder="firstName"
        type="firstName"
      />
      {errors.password && <div className="error">{errors.password}</div>}
      <input
        name="lastName"
        value={values.lastName}
        onChange={handleChange}
        ref={refs.lastName}
        placeholder="lastName"
        type="lastName"
      />
      {errors.password && <div className="error">{errors.password}</div>}
      <input
        name="phoneNumber"
        value={values.phoneNumber}
        onChange={handleChange}
        ref={refs.phoneNumber}
        placeholder="phoneNumber"
        type="phoneNumber"
      />
      {errors.password && <div className="error">{errors.password}</div>}
      <input
        name="gender"
        value={values.gender}
        onChange={handleChange}
        ref={refs.gender}
        placeholder="gender"
        type="gender"
      />
      {errors.password && <div className="error">{errors.password}</div>}
      <input
        name="birth"
        value={String(values.birth)}
        onChange={handleChange}
        ref={refs.birth}
        placeholder="birth"
        type="birth"
      />
      {errors.password && <div className="error">{errors.password}</div>}

      <Button type="submit">{isPending ? "..." : "Login"}</Button>
    </form>
  );
};

export default RegisterForm;
