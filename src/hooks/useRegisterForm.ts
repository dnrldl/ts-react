import { useRef, useState } from "react";
import { RegisterRequest } from "types/api";
import { getCurrentDate, getDateOnly } from "utils/dateUtils";

type RegisterForm = RegisterRequest;

export const useRegisterForm = (onSubmit: (values: RegisterForm) => void) => {
  const [values, setValues] = useState<RegisterForm>({
    email: "",
    password: "",
    nickname: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    gender: "",
    birth: getDateOnly(getCurrentDate()),
  });
  const [errors, setErrors] = useState<Partial<RegisterForm>>({});
  const refs = {
    email: useRef<HTMLInputElement>(null),
    password: useRef<HTMLInputElement>(null),
    nickname: useRef<HTMLInputElement>(null),
    firstName: useRef<HTMLInputElement>(null),
    lastName: useRef<HTMLInputElement>(null),
    phoneNumber: useRef<HTMLInputElement>(null),
    gender: useRef<HTMLInputElement>(null),
    birth: useRef<HTMLInputElement>(null),
  };

  const validate = () => {
    const errs: Partial<RegisterForm> = {};
    if (!values.email) errs.email = "이메일 필수";
    if (!values.password) errs.password = "비밀번호 필수";
    if (!values.password) errs.password = "비밀번호 필수";
    if (!values.password) errs.password = "비밀번호 필수";
    if (!values.password) errs.password = "비밀번호 필수";
    if (!values.password) errs.password = "비밀번호 필수";
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
      type RefKey = keyof typeof refs;
      setErrors(errs);
      const firstInvalid = Object.keys(errs)[0] as RefKey;
      refs[firstInvalid].current?.focus();
      return;
    }
    onSubmit(values);
  };

  return { values, errors, refs, handleChange, handleSubmit };
};
