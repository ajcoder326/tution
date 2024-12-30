export interface ValidationRules {
  [key: string]: {
    required?: boolean;
    pattern?: RegExp;
    minLength?: number;
    message?: string;
  };
}

export interface FormErrors {
  [key: string]: string;
}