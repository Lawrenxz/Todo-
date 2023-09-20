import { FC, ChangeEvent } from "react";
import { InputProps } from "../interfaces/interfaces";

const CustomInput: FC<InputProps> = ({
  value,
  onChange,
  name,
  placeHolder,
  type,
}) => {
  const handleOnchange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };
  return (
    <input
      value={value}
      name={name}
      placeholder={placeHolder}
      onChange={handleOnchange}
      type={type}
      className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border  rounded-md py-2 px-2 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm text-black  "
    />
  );
};

export default CustomInput;
