import { AppwriteException, ID } from "appwrite";
import { z } from "zod";

import { env } from "@/config/env";
import { createAdminClient } from "@/lib/client/appwrite";
import { createAdminServer } from "@/lib/server/appwrite";

import { signUpSchema, signinSchema, verificationSchema } from "../schema";
import { AuthRepository } from "./auth.repository";

export default class AuthService {
  private repository: AuthRepository;
  constructor() {
    this.repository = new AuthRepository();
  }

  async SignIn(data: z.infer<typeof signinSchema>) {
    const { email, password } = data;
    const { account } = await createAdminClient();

    const response = await account.createEmailPasswordSession(email, password);

    return {
      data: response,
      success: true,
    };
  }

  async SignUp(values: z.infer<typeof signUpSchema>) {
    const { email, password, fullname } = values;

    const { auth } = await createAdminServer();
    const { account } = await createAdminClient();

    const newUser = await auth.create(
      ID.unique(),
      email,
      undefined,
      password,
      fullname
    );

    await account.createMagicURLToken(
      newUser.$id,
      newUser.email,
      env.NEXT_PUBLIC_BASE_URL.concat("/api/v1/auth/verification")
    );

    return {
      data: newUser,
    };
  }

  async Verification(data: z.infer<typeof verificationSchema>) {
    try {
      const { account } = await createAdminClient();

      const session = await account.createSession(data.userId, data.secret);

      return {
        data: session,
      };
    } catch (error) {
      throw error as AppwriteException;
    }
  }
}
