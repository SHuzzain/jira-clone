import AuthService from "./auth.service";
import { SignInRoute, SignUpRoute } from "./auth.routes";
import { AppRouteHandler } from "@/server/types";

export default class AuthController {
  private service: AuthService;

  constructor() {
    this.service = new AuthService();
  }

  SignIn: AppRouteHandler<SignInRoute> = async (context) => {
    const { email, password } = context.req.valid("json");

    const response = await this.service.SignIn({ email, password });

    return context.json({
      success: response.success,
    });
  };

  SignUp: AppRouteHandler<SignUpRoute> = async (context) => {
    const { email, password, confirmPassword, fullname } =
      context.req.valid("json");

    const response = await this.service.SignUp({
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
