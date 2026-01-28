import { createContext, useState, type ReactElement, type ReactNode } from "react";

type ThemeContextType = {
  primaryColor: string;
  textPrimaryColor: string;
  setTextPrimaryColor: any;
  setPrimaryColor: any;
};

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = (props: { children: ReactNode }): ReactElement => {
  const [primaryColor, setPrimaryColor] = useState('bg-red-600');
  const [textPrimaryColor, setTextPrimaryColor] = useState('text-red-600');

  return (
    <ThemeContext.Provider
      {...props}
      value={{ primaryColor, textPrimaryColor, setPrimaryColor, setTextPrimaryColor }}
    >
      {props.children}
    </ThemeContext.Provider>
  );
};
