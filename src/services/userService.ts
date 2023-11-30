import config from "../constants/config";
import { CREATE_ACCOUNT, GET_ACCOUNT } from "./CONSTANTS";
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

export const createAccount = async (account: {
  name: string;
  lastName: string;
  phone: string;
  dni: string;
  email: string;
  isAdmin?: boolean;
  firebaseAuthID: string;
}) => {
  await fetch(config.SERVER_DOMAIN + CREATE_ACCOUNT, {
    method: "post",
    body: JSON.stringify({
      ...account,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
};
