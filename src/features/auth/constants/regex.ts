export const REGEX = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PASSWORD: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*]).{8,20}$/,
  PHONE_NUMBER: /^\d{10,11}$/,
} as const;
