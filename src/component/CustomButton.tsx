import { FC, ButtonHTMLAttributes } from "react";

interface CustomButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
}

const CustomButton: FC<CustomButtonProps> = ({ title, ...rest }) => {
  return (
    <button
      className="whitespace-nowrap text-center bg-black text-white p-2 rounded-md"
      {...rest}
    >
      {title}
    </button>
  );
};

export default CustomButton;
