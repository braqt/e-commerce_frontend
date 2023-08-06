import config from "../constants/config";
import { GET_ACCOUNT } from "./CONSTANTS";
import { Account } from "./interfaces";

export const getAccount = async (
  firebaseAuthToken: string
): Promise<Account> => {
  const response = await fetch(config.SERVER_DOMAIN + GET_ACCOUNT, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${firebaseAuthToken}`,
    },
  });

  return await response.json();
};
