import {
  User as FirebaseUser,
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";

export class AuthController {
  async createUserWithEmailAndPassword(email: string, password: string) {
    return await createUserWithEmailAndPassword(getAuth(), email, password);
  }

  async sendEmailVerification(firebaseUser: FirebaseUser) {
    await sendEmailVerification(firebaseUser);
  }

  async signInWithEmailAndPassword(email: string, password: string) {
    return await signInWithEmailAndPassword(getAuth(), email, password);
  }
}
