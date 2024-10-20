import { signinSchema } from "../schema";
import { HonoContext } from "@/server/types";
import AuthService from "./auth.service";

export default class AuthController {
  private repository: AuthService;
  constructor() {
    this.repository = new AuthService();
  }

  async SignIn(context: HonoContext<"json", "/signin", typeof signinSchema>) {
    const { email, password } = context.req.valid("json");

    const response = await this.repository.SignIn({ email, password });
    return context.json(response);
  }
}
