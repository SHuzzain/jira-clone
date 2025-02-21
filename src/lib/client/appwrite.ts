import { Account, Client } from "appwrite";

import { env } from "@/config/env";

export async function createAdminClient() {
  const client = new Client()
    .setEndpoint(env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
    .setProject(env.NEXT_PUBLIC_APPWRITE_PROJECT);

  return {
    get account() {
      return new Account(client);
    },
  };
}
