import { useCallback, useRef, useState } from "react";
import { RegisterRequest } from "types/auth";
import { getCurrentDate, getDateOnly } from "utils/dateUtils";

type RegisterForm = RegisterRequest & { confirmPassword: string };

export const useRegisterForm = (onSubmit: (values: RegisterForm) => void) => {
  const [values, setValues] = useState<RegisterForm>({
    email: "",
    password: "",
    confirmPassword: "",
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
    confirmPassword: useRef<HTMLInputElement>(null),
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
    if (!values.confirmPassword) errs.confirmPassword = "비밀번호 확인 필수";
    else if (values.password !== values.confirmPassword)
      errs.confirmPassword = "비밀번호가 일치하지 않습니다";
    if (!values.nickname) errs.nickname = "닉네임 필수";
    if (!values.firstName) errs.firstName = "이름 필수";
    if (!values.lastName) errs.lastName = "성 필수";
    if (!values.phoneNumber) errs.phoneNumber = "전화번호 필수";
    if (!values.gender) errs.gender = "성별 필수";
    if (!values.birth) errs.birth = "생년월일 필수";
    return errs;
  };

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // error check
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
