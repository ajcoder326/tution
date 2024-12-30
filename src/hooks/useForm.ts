import { useState, ChangeEvent, FormEvent } from 'react';

interface ValidationRules {
  [key: string]: {
    required?: boolean;
    pattern?: RegExp;
    minLength?: number;
    message?: string;
  };
}

interface Errors {
  [key: string]: string;
}

export const useForm = <T extends { [key: string]: any }>(
  initialState: T,
  validationRules: ValidationRules,
  onSubmit: (data: T) => void
) => {
  const [formData, setFormData] = useState<T>(initialState);
  const [errors, setErrors] = useState<Errors>({});

  const validateField = (name: string, value: any) => {
    const rules = validationRules[name];
    if (!rules) return '';

    if (rules.required && !value) {
      return rules.message || 'This field is required';
    }
    if (rules.pattern && !rules.pattern.test(value)) {
      return rules.message || 'Invalid format';
    }
    if (rules.minLength && value.length < rules.minLength) {
      return rules.message || `Minimum length is ${rules.minLength}`;
    }
    return '';
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors: Errors = {};
    Object.keys(validationRules).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });

    if (Object.keys(newErrors).length === 0) {
      onSubmit(formData);
    } else {
      setErrors(newErrors);
    }
  };

  return { formData, errors, handleChange, handleSubmit };
};