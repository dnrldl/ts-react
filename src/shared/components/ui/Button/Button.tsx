import React from "react";
import styles from "./Button.module.scss";
import clsx from "clsx";

type Variant = "primary" | "outline" | "underline";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  children: React.ReactNode;
}

const Button = ({ variant = "primary", children, ...props }: ButtonProps) => {
  return (
    <button className={clsx(styles.button, styles[variant])} {...props}>
      {children}
    </button>
  );
};

export default Button;
