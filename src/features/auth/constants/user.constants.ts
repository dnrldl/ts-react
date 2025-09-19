import { REGEX } from "./regex";
import { ValidationMessage } from "./validationMessages";

export const UserValidation = {
  EMAIL: {
    REGEX: REGEX.EMAIL,
    REQUIRED: ValidationMessage.REQUIRED.EMAIL,
    FORMAT: ValidationMessage.FORMAT.EMAIL,
    PATTERN: ValidationMessage.FORMAT.EMAIL_PATTERN,
  },
  PASSWORD: {
    REGEX: REGEX.PASSWORD,
    REQUIRED: ValidationMessage.REQUIRED.PASSWORD,
    SIZE: ValidationMessage.FORMAT.PASSWORD_SIZE,
    PATTERN: ValidationMessage.FORMAT.PASSWORD_PATTERN,
  },
  CONFIRM_PASSWORD: {
    REQUIRED: ValidationMessage.REQUIRED.CONFIRM_PASSWORD,
    FORMAT: ValidationMessage.FORMAT.CONFIRM_PASSWORD_MATCH,
  },
  NICKNAME: {
    REQUIRED: ValidationMessage.REQUIRED.NICKNAME,
    SIZE: ValidationMessage.FORMAT.NICKNAME_SIZE,
  },
  FIRST_NAME: {
    REQUIRED: ValidationMessage.REQUIRED.FIRST_NAME,
    SIZE: ValidationMessage.FORMAT.FIRST_NAME_SIZE,
  },
  LAST_NAME: {
    REQUIRED: ValidationMessage.REQUIRED.LAST_NAME,
    SIZE: ValidationMessage.FORMAT.LAST_NAME_SIZE,
  },
  PHONE_NUMBER: {
    REGEX: REGEX.PHONE_NUMBER,
    REQUIRED: ValidationMessage.REQUIRED.PHONE_NUMBER,
    PATTERN: ValidationMessage.FORMAT.PHONE_NUMBER_PATTERN,
  },
  GENDER: {
    REQUIRED: ValidationMessage.REQUIRED.GENDER,
  },
  BIRTH: {
    REQUIRED: ValidationMessage.REQUIRED.BIRTH,
    PAST: ValidationMessage.FORMAT.BIRTH_PAST,
  },
} as const;
