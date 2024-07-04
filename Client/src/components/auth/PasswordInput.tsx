import React, { useState } from "react";

import visibility from "../../assets/icons/visibility.svg";
import visibility_off from "../../assets/icons/visibility off.svg";

type PasswordProps = {
  error: string | undefined;
  placeholder: string,
  inputRef: React.RefObject<HTMLInputElement>;
};

function PasswordInput({ error, inputRef, placeholder }: PasswordProps) {
  const [showPassword, seetShowPassword] = useState(false);

  const showPasswordFn = () => {
    seetShowPassword((prevSate) => {
      return !prevSate;
    });
  };

  return (
    <>
      <label className="block text-sm mb-2  mt-3">Password</label>
      <div className="relative">
        <img
          src={showPassword ? visibility_off : visibility}
          className=" absolute right-2 cursor-pointer w-6 top-[10px] "
          onClick={showPasswordFn}
        />
        <input
          defaultValue={""}
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder={placeholder}
          ref={inputRef}
          className={
            (error
              ? "focus:outline-none focus:ring-4 focus:ring-red-500/30 border-red-500 "
              : "border-blackInput focus:border-amber-300 focus:ring-4 focus:ring-amber-300/20 ") +
            "text-white transition-all duration-150 bg-input rounded border p-2 px-2 text-base w-full placeholder:text-blackInput pr-9 "
          }
        />
      </div>
    </>
  );
}

export default PasswordInput;
