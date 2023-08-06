import { AuthError } from "firebase/auth";
import {
  AUTH_EMAIL_ALREADY_EXISTS,
  AUTH_INTERNAL_ERROR,
  AUTH_INVALID_PASSWORD,
  AUTH_TOO_MANY_REQUESTS,
  AUTH_USER_NOT_FOUND,
  AUTH_WRONG_PASSWORD,
} from "../constants/firebase/firebaseErrorCodes";

export const getMessageFromAuthError = (authError: AuthError) => {
  switch (authError.code) {
    case AUTH_INTERNAL_ERROR:
      return "Internal Server Error";
    case AUTH_EMAIL_ALREADY_EXISTS:
      return "An account with this email already exists";
    case AUTH_USER_NOT_FOUND:
      return "No user found for this email";
    case AUTH_INVALID_PASSWORD:
      return "Email must have at least six characters";
    case AUTH_WRONG_PASSWORD:
      return "No user found for this email/password";
    case AUTH_TOO_MANY_REQUESTS:
      return "Access to this account has been temporarily disabled due to many failed login attempts";
    default:
      throw Error("Not error message found for that code error");
  }
};
