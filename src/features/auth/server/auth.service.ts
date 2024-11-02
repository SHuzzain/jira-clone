import { z } from "zod";
import { AuthRepository } from "./auth.repository";
import { signinSchema } from "../schema";

export default class AuthService {
  private repository: AuthRepository;
  constructor() {
    this.repository = new AuthRepository();
  }

  async SignIn(data: z.infer<typeof signinSchema>) {
    const { email, password } = data;
    await this.repository.getUserByEmail(email);

    return {
      data: {
        email,
        password,
      },
      success: true,
    };
  }
}
