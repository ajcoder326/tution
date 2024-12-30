import { ValidationRules } from '../types/form';

export const commonValidationRules = {
  fullName: {
    required: true,
    minLength: 3,
    message: 'Full name must be at least 3 characters'
  },
  email: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: 'Please enter a valid email address'
  },
  password: {
    required: true,
    minLength: 8,
    message: 'Password must be at least 8 characters'
  }
};

export const tutorValidationRules: ValidationRules = {
  ...commonValidationRules,
  qualification: {
    required: true,
    message: 'Please enter your highest qualification'
  },
  experience: {
    required: true,
    pattern: /^\d+$/,
    message: 'Please enter valid years of experience'
  }
};

export const parentValidationRules: ValidationRules = {
  ...commonValidationRules,
  grade: {
    required: true,
    pattern: /^([1-9]|1[0-2])$/,
    message: 'Please enter a valid grade (1-12)'
  },
  location: {
    required: true,
    minLength: 3,
    message: 'Please enter a valid location'
  }
};