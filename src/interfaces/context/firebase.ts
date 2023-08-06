import { User } from "firebase/auth";

export interface IAuthContext {
  user: User | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<User>;
  signUp: (email: string, password: string) => Promise<User>;
  signOut: () => Promise<void>;
  sendEmailVerification: (user: User) => Promise<void>;
  sendEmailToResetPassord: (email: string) => Promise<void>;
}
