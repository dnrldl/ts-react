import { useEffect } from "react";
import { useThemeStore } from "../store/useThemeStore";

export const useApplyTheme = () => {
  const theme = useThemeStore((state) => state.theme);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
  }, [theme]);
};
