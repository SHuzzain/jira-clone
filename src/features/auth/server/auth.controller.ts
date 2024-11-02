import AuthService from "./auth.service";
import { SignInRoute } from "./auth.routes";
import { AppRouteHandler } from "@/server/types";

export default class AuthController {
  private repository: AuthService;
  constructor() {
    this.repository = new AuthService();
  }

  SignIn: AppRouteHandler<SignInRoute> = async (context) => {
    const { email, password } = await context.req.json();

    const response = await this.repository.SignIn({ email, password });

    return context.json({
      payload: {
        ...response.data,
      },
      success: response.success,
    });
  };
}
