import { useState } from 'react';

interface SubmitOptions<T> {
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
}

export const useFormSubmit = <T>() => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitForm = async (
    data: T,
    submitFn: (data: T) => Promise<void>,
    options?: SubmitOptions<T>
  ) => {
    setIsLoading(true);
    setError(null);

    try {
      await submitFn(data);
      options?.onSuccess?.(data);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('An error occurred');
      setError(error.message);
      options?.onError?.(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, submitForm };
};