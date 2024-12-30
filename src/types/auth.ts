export interface AuthUser {
  id: string;
  email: string;
  role: 'admin' | 'tutor' | 'parent';
}

export interface SignUpData {
  email: string;
  password: string;
  fullName: string;
  role: 'tutor' | 'parent';
}

export interface SignInData {
  email: string;
  password: string;
}