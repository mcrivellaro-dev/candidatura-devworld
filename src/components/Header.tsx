import { useContext } from "react";
import { ThemeContext } from "../context/theme-context";

interface Props {
  title: string;
}

export const Header = ({ title }: Props) => {
  const theme = useContext(ThemeContext);

  return (
    <div className={`${theme?.primaryColor ?? ""} p-2 mb-2`}>
      <h1 className="text-3xl font-bold mb-2 p-2 text-white">
        {title}
      </h1>
    </div>
  )
}