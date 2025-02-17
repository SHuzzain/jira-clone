import { ID } from "appwrite";
import { z } from "zod";

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

    return {
      data: {
        email,
        password,
      },
      success: true,
    };
  }

  async SignUp(data: z.infer<typeof signUpSchema>) {
    const { email, password, fullname } = data;

    const { auth } = await createAdminServer();

    const user = await auth.createBcryptUser(
      ID.unique(),
      email,
      password,
      fullname
    );

    return {
      data: user,
    };
  }

  async Verification(data: z.infer<typeof verificationSchema>) {
    const { account } = await createAdminClient();
    const server = await createAdminServer();
    const session = await account.createSession(data.userId, data.token);

    return {
      data: response,
    };
  }
}
