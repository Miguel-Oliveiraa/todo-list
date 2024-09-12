// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { Input } from "@/components/ui/input"; // Certifique-se de ajustar o caminho conforme necessário
import { Eye, EyeOff } from "react-feather"; // Usando ícones do pacote react-feather

// eslint-disable-next-line react/prop-types
const PasswordInput = ({ id, placeholder, ...props }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="relative">
      <Input
        type={showPassword ? "text" : "password"}
        id={id}
        placeholder={placeholder}
        {...props}
      />
      <button
        type="button"
        onClick={handleTogglePassword}
        className="absolute inset-y-0 right-0 flex items-center pr-3"
      >
        {showPassword ? (
          <EyeOff className="w-5 h-5 text-gray-500" />
        ) : (
          <Eye className="w-5 h-5 text-gray-500" />
        )}
      </button>
    </div>
  );
};

export default PasswordInput;
