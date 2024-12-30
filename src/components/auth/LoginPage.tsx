import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock } from 'lucide-react';
import { signIn } from '../../lib/auth';
import InputField from './InputField';
import Button from '../ui/Button';
import FormError from './FormError';

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await signIn(formData);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to sign in');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5DC] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-brown-800 text-center mb-6">
          Welcome Back
        </h2>

        {error && <FormError message={error} />}

        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField
            icon={Mail}
            type="email"
            placeholder="Email Address"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <InputField
            icon={Lock}
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <Button
            type="submit"
            isLoading={isLoading}
            className="mt-6"
          >
            Sign In
          </Button>
        </form>

        <p className="mt-4 text-center text-brown-600">
          Don't have an account?{' '}
          <a href="/" className="text-yellow-600 hover:text-yellow-700">
            Register here
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;