import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useUserStore } from "shared/stores/userStore";
import { loginFormSchema } from "features/auth/schemas";
import { useAccessTokenStore } from "shared/stores/accessTokenStore";
import { LoginFormData } from "features/auth/types";
import { loginApi } from "features/auth/api/api";

export const useLoginForm = (redirectPath?: string) => {
  const setUserInfo = useUserStore((s) => s.setUserInfo);
  const userInfoClear = useUserStore((s) => s.clear);
  const navigate = useNavigate();
  const location = useLocation();
  const qc = useQueryClient();
  const setToken = useAccessTokenStore((s) => s.setToken);
  const clearToken = useAccessTokenStore((s) => s.clearToken);

  const {
    register,
    handleSubmit,
    watch,
    formState,
    getValues,
    setValue,
    setError,
    reset,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
    mode: "onSubmit",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate, isPending } = useMutation(
    {
      mutationFn: (data: LoginFormData) => loginApi(data),
      onSuccess: async (data) => {
        setToken(data.accessToken);

        // 전역 상태에 유저 정보 저장
        setUserInfo({
          userId: data.userId,
          nickname: data.nickname,
          email: data.email,
          profileImageUrl: data.profileImageUrl,
          role: data.role,
        });

        await qc.invalidateQueries({ queryKey: ["auth", "me"] });

        toast.success("Login Success!");
        // 로그인 하기 전으로 돌아가기
        const from = (location.state as { from?: string } | null)?.from;
        navigate(
          redirectPath === "/login" ? "/" : redirectPath ?? from ?? "/",
          { replace: true }
        );
      },
      onError: (e) => {
        console.error(e);
        clearToken();
        userInfoClear();

        toast.error("Login Failed!");
      },
    },
    qc
  );

  const onSubmit = handleSubmit((values) => {
    if (isPending) return;
    mutate(values);
  });

  return {
    // useForm 객체
    register,
    handleSubmit,
    watch,
    formState,
    getValues,
    setValue,
    setError,
    reset,

    // useMutation 객체
    mutate,
    isPending,

    // 실제 요청
    onSubmit,
  };
};
