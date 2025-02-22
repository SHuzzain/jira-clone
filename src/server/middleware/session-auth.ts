"use server";

import {
  Account,
  type Account as AccountType,
  Client,
  Databases,
  type Databases as DatabasesType,
  Models,
  Storage,
  type Storage as StorageType,
} from "appwrite";
import { MiddlewareHandler } from "hono";
import { getCookie } from "hono/cookie";
import { createMiddleware } from "hono/factory";
import { type Users as UserType } from "node-appwrite";

import { env } from "@/config/env";
import { AUTH_COOKIE } from "@/features/auth/constants";

export type AdditionalContext = {
  Variables: {
    account: AccountType;
    databases: DatabasesType;
    storage: StorageType;
    users: UserType;
    user: Models.User<Models.Preferences>;
  };
};

export const sessionMiddleware: MiddlewareHandler<
  AdditionalContext,
  string,
  {}
> = async (c, next) => {
  const client = new Client()
    .setEndpoint(env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
    .setProject(env.NEXT_PUBLIC_APPWRITE_PROJECT);

  const currentPath = c.req.path;
  if (["/auth"].includes(currentPath)) {
    await next();
    return;
  }

  const session = getCookie(c, AUTH_COOKIE);

  if (!session) {
    c.json(
      {
        error: "Unauthorized",
      },
      401
    );
  }

  client.setSession(session!);

  const account = new Account(client);
  const databases = new Databases(client);
  const storage = new Storage(client);

  const user = await account.get();

  c.set("account", account);
  c.set("databases", databases);
  c.set("storage", storage);
  c.set("user", user);

  await next();
};
