import React from 'react';
import { User, Mail, Lock, GraduationCap, MapPin } from 'lucide-react';
import InputField from './InputField';
import Button from '../ui/Button';
import FormError from './FormError';
import { useForm } from '../../hooks/useForm';
import { useFormSubmit } from '../../hooks/useFormSubmit';
import { parentValidationRules } from '../../config/validationRules';
import { registerUser } from '../../utils/api';

interface ParentFormData {
  fullName: string;
  email: string;
  password: string;
  grade: string;
  location: string;
}

const initialState: ParentFormData = {
  fullName: '',
  email: '',
  password: '',
  grade: '',
  location: ''
};

const ParentRegistration = () => {
  const { isLoading, error, submitForm } = useFormSubmit<ParentFormData>();

  const handleFormSubmit = async (data: ParentFormData) => {
    await submitForm(data, 
      async (formData) => await registerUser(formData, 'parent'),
      {
        onSuccess: () => {
          // Handle successful registration
          console.log('Registration successful');
        }
      }
    );
  };

  const { formData, errors, handleChange, handleSubmit } = useForm<ParentFormData>(
    initialState,
    parentValidationRules,
    handleFormSubmit
  );

  return (
    <div className="max-w-md w-full mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-brown-800 mb-6 text-center">Join as a Parent</h2>
      {error && <FormError message={error} />}
      <form onSubmit={handleSubmit} className="space-y-4 mt-4">
        <InputField
          icon={User}
          type="text"
          placeholder="Full Name"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          error={errors.fullName}
          disabled={isLoading}
          required
        />
        <InputField
          icon={Mail}
          type="email"
          placeholder="Email Address"
          name="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          disabled={isLoading}
          required
        />
        <InputField
          icon={Lock}
          type="password"
          placeholder="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          disabled={isLoading}
          required
        />
        <InputField
          icon={GraduationCap}
          type="text"
          placeholder="Grade"
          name="grade"
          value={formData.grade}
          onChange={handleChange}
          error={errors.grade}
          disabled={isLoading}
          required
        />
        <InputField
          icon={MapPin}
          type="text"
          placeholder="Location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          error={errors.location}
          disabled={isLoading}
          required
        />
        <div className="mt-6">
          <Button
            type="submit"
            variant="secondary"
            isLoading={isLoading}
          >
            Register as Parent
          </Button>
        </div>
      </form>
    </div>
  );
};

// Add this line for a default export
export default ParentRegistration;
