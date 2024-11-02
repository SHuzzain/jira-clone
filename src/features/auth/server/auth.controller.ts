import AuthService from "./auth.service";
import { SignInRoute, SignUpRoute } from "./auth.routes";
import { AppRouteHandler } from "@/server/types";

export default class AuthController {
  private repository: AuthService;
  constructor() {
    this.repository = new AuthService();
  }

  SignIn: AppRouteHandler<SignInRoute> = async (context) => {
    const { email, password } = await context.req.valid("json");

    const response = await this.repository.SignIn({ email, password });

    return context.json({
      success: response.success,
    });
  };

  SignUp: AppRouteHandler<SignUpRoute> = async (context) => {
    const { email, password, confirmPassword, fullname } =
      await context.req.valid("json");

    const response = await this.repository.SignUp({
      email,
      password,
      confirmPassword,
      fullname,
    });

    return context.json({
      success: response.success,
    });
  };
}
