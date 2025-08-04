import { useRef, useState } from "react";

type LoginForm = {
  email: string;
  password: string;
};

export const useLoginForm = (onSubmit: (values: LoginForm) => void) => {
  const [values, setValues] = useState<LoginForm>({ email: "", password: "" });
  const [errors, setErrors] = useState<Partial<LoginForm>>({});
  const refs = {
    email: useRef<HTMLInputElement>(null),
    password: useRef<HTMLInputElement>(null),
  };

  const validate = () => {
    const errs: Partial<LoginForm> = {};
    if (!values.email) errs.email = "이메일 필수";
    if (!values.password) errs.password = "비밀번호 필수";
    return errs;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      const firstInvalid = Object.keys(errs)[0];
      refs[firstInvalid as keyof LoginForm].current?.focus();
      return;
    }
    onSubmit(values);
  };

  return { values, errors, refs, handleChange, handleSubmit };
};
