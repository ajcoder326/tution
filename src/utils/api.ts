interface RegisterData {
  fullName: string;
  email: string;
  password: string;
  [key: string]: string;
}

export const registerUser = async (data: RegisterData, type: 'tutor' | 'parent'): Promise<void> => {
  // Simulate API call
  await new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.1) { // 90% success rate
        resolve(undefined);
      } else {
        reject(new Error('Registration failed. Please try again.'));
      }
    }, 1500);
  });
};