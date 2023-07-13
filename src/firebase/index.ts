import { initializeApp } from "firebase/app";

import config from "./config";

export const initializeFirebaseApp = () => {
  initializeApp(config.firebase);
};
