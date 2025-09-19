import { useMutation, useQueryClient } from "@tanstack/react-query";
import { registerApi } from "features/auth/api/api";
import { RegisterFormData } from "features/auth/types";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const useRegisterForm = (redirectPath?: string) => {
  const location = useLocation();
  const navigate = useNavigate();
  const qc = useQueryClient();

  const {
    register,
    handleSubmit,
    formState,
    watch,
    getValues,
    setValue,
    setError,
  } = useForm<RegisterFormData>({
    mode: "onSubmit",
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      nickname: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
    },
  });

  const { mutate, isPending } = useMutation(
    {
      mutationFn: registerApi,
      onSuccess: (data) => {
        toast.success("Register Success! Please login.");

        const from = (location.state as { from?: string } | null)?.from;
        navigate(redirectPath ?? from ?? "/login", { replace: true });
      },
      onError: (error) => {
        toast.error("Register Failed. Please try again.");
      },
    },
    qc
  );

  const onSubmit = handleSubmit((values) => {
    if (!formState.isValid) return;

    mutate(values);
  });

  return {
    // useForm 객체
    register,
    handleSubmit,
    formState,
    watch,
    getValues,
    setValue,
    setError,

    // useMutation 객체
    mutate,
    isPending,

    // 실제 요청
    onSubmit,
  };
};
