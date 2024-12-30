import React from 'react';
import { User, Mail, Lock, GraduationCap, Calendar } from 'lucide-react';
import InputField from './InputField';
import { useForm } from '../../hooks/useForm';
import { tutorValidationRules } from '../../config/validationRules';

interface TutorFormData {
  fullName: string;
  email: string;
  password: string;
  qualification: string;
  experience: string;
}

const initialState: TutorFormData = {
  fullName: '',
  email: '',
  password: '',
  qualification: '',
  experience: ''
};

const TutorRegistration = () => {
  const handleFormSubmit = (data: TutorFormData) => {
    console.log('Form submitted:', data);
    // Handle form submission
  };

  const { formData, errors, handleChange, handleSubmit } = useForm<TutorFormData>(
    initialState,
    tutorValidationRules,
    handleFormSubmit
  );

  return (
    <div className="max-w-md w-full mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-brown-800 mb-6 text-center">Join as a Tutor</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <InputField
          icon={User}
          type="text"
          placeholder="Full Name"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          error={errors.fullName}
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
          required
        />
        <InputField
          icon={GraduationCap}
          type="text"
          placeholder="Highest Qualification"
          name="qualification"
          value={formData.qualification}
          onChange={handleChange}
          error={errors.qualification}
          required
        />
        <InputField
          icon={Calendar}
          type="text"
          placeholder="Years of Experience"
          name="experience"
          value={formData.experience}
          onChange={handleChange}
          error={errors.experience}
          required
        />
        
        <div className="mt-6">
          <button
            type="submit"
            className="w-full bg-yellow-600 text-white py-2 px-4 rounded-lg hover:bg-yellow-700 transition-colors"
          >
            Register as Tutor
          </button>
        </div>
      </form>
    </div>
  );
};

export default TutorRegistration;