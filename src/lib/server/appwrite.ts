import { Account, Client, Users } from "node-appwrite";
import "server-only";

import { env } from "@/config/env";

export async function createAdminServer() {
  const client = new Client()
    .setEndpoint(env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
    .setProject(env.NEXT_PUBLIC_APPWRITE_PROJECT)
    .setKey(env.NEXT_APPWRITE_KEY);

  return {
    get account() {
      return new Account(client);
    },
    get auth() {
      return new Users(client);
    },
  };
}
