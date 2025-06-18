import { useEffect, useState } from "react";
import { type ObjectSchema } from "yup";

export const useFormHook = <T extends Record<string, any>>(
  initialValues: T,
  schema: ObjectSchema<any>
) => {
  const [formData, setFormData] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  useEffect(() => {
    console.log("Errors updated:", errors);
  }, [errors]);

  const validateField = async (name: keyof T, value: any) => {
    try {
      const updatedFormData = { ...formData, [name]: value };
      await schema.validateAt(name as string, updatedFormData);
      setErrors((prev) => ({ ...prev, [name]: "" }));
    } catch (err: any) {
      setErrors((prev) => ({ ...prev, [name]: err.message }));
    }
  };

  const validateForm = async () => {
    try {
      await schema.validate(formData, { abortEarly: false });
      setErrors({});
      return true;
    } catch (err: any) {
      const fieldErrors: Partial<Record<keyof T, string>> = {};
      err.inner.forEach((error: any) => {
        fieldErrors[error.path as keyof T] = error.message;
      });
      setErrors(fieldErrors);
      return false;
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    validateField(name as keyof T, value);
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    validateField(name as keyof T, value);
  };

  const resetForm = () => {
    setFormData(initialValues);
    setErrors({});
  };

  return {
    formData,
    setFormData,
    errors,
    validateForm,
    handleChange,
    validateField,
    handleBlur,
    resetForm,
  };
};
