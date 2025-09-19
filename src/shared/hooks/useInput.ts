import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useCallback,
  useState,
} from "react";

type ReturnTypes<T = any> = [T, Dispatch<SetStateAction<T>>, (e: any) => void];

const useInput = <T = any>(initialDate: T): ReturnTypes<T> => {
  const [value, setValue] = useState(initialDate);
  const handler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value as unknown as T);
  }, []);

  return [value, setValue, handler];
};

export default useInput;
