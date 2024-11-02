import { z } from "zod";
import { AuthRepository } from "./auth.repository";
import { signinSchema, signUpSchema } from "../schema";

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

  async SignUp(data: z.infer<typeof signUpSchema>) {
    const { email, password, confirmPassword, fullname } = data;

    await this.repository.getUserByEmail(email);

    return {
      data: {
        email,
        password,
        confirmPassword,
        fullname,
      },
      success: true,
    };
  }
}
