import { useState } from "react";

export const useForm = <T extends Record<string, any>>(initialState: T) => {
  const [formData, setFormData] = useState(initialState);

  const handleChange = (name: keyof T, value: any) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const resetForm = () => {
    setFormData(initialState);
  };

  return { formData, handleChange, resetForm };
};
