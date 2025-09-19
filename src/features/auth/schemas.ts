import { z } from "zod";
import { UserValidation } from "./constants/user.constants";

export const loginFormSchema = z.object({
  email: z
    .email(UserValidation.EMAIL.FORMAT)
    .nonempty(UserValidation.EMAIL.REQUIRED),

  password: z
    .string()
    .nonempty(UserValidation.PASSWORD.REQUIRED)
    .min(8, UserValidation.PASSWORD.SIZE)
    .max(20, UserValidation.PASSWORD.SIZE)
    .regex(UserValidation.PASSWORD.REGEX, UserValidation.PASSWORD.PATTERN),
});

export const registerFormSchema = z
  .object({
    email: z
      .email(UserValidation.EMAIL.FORMAT)
      .nonempty(UserValidation.EMAIL.REQUIRED),

    password: z
      .string()
      .nonempty(UserValidation.PASSWORD.REQUIRED)
      .min(8, UserValidation.PASSWORD.SIZE)
      .max(20, UserValidation.PASSWORD.SIZE)
      .regex(UserValidation.PASSWORD.REGEX, UserValidation.PASSWORD.PATTERN),

    confirmPassword: z
      .string()
      .nonempty(UserValidation.CONFIRM_PASSWORD.REQUIRED),

    nickname: z
      .string()
      .nonempty(UserValidation.NICKNAME.REQUIRED)
      .min(2, UserValidation.NICKNAME.SIZE)
      .max(20, UserValidation.NICKNAME.SIZE),

    firstName: z
      .string()
      .nonempty(UserValidation.FIRST_NAME.REQUIRED)
      .max(10, UserValidation.FIRST_NAME.SIZE),

    lastName: z
      .string()
      .nonempty(UserValidation.LAST_NAME.REQUIRED)
      .max(10, UserValidation.LAST_NAME.SIZE),

    phoneNumber: z
      .string()
      .nonempty(UserValidation.PHONE_NUMBER.REQUIRED)
      .regex(
        UserValidation.PHONE_NUMBER.REGEX,
        UserValidation.PHONE_NUMBER.PATTERN
      ),

    // gender: z.enum(["MALE", "FEMALE", "OTHER"], UserValidation.GENDER.REQUIRED),
    gender: z.string(),

    birth: z
      .string()
      .nonempty(UserValidation.BIRTH.REQUIRED)
      .refine((date) => new Date(date) < new Date(), {
        message: UserValidation.BIRTH.PAST,
      }),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: UserValidation.CONFIRM_PASSWORD.FORMAT,
        path: ["confirmPassword"],
      });
    }
  });
