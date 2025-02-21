import { setCookie } from "hono/cookie";
import * as HttpStatusCode from "stoker/http-status-codes";

import { AppRouteHandler } from "@/server/types";

import { AUTH_COOKIE_EXPIRES } from "../constants";
import { SignInRoute, SignUpRoute, VerificationRoute } from "./auth.routes";
import AuthService from "./auth.service";

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
    try {
      const { email, password, confirmPassword, fullname } =
        context.req.valid("json");

      const response = await this.service.SignUp({
        email,
        password,
        confirmPassword,
        fullname,
      });

      return context.json({
        data: response,
        success: true,
      });
    } catch (error) {
      const logger = context.get("logger");
      logger.error(error);

      return context.json(
        { success: false, error },
        HttpStatusCode.INTERNAL_SERVER_ERROR
      );
    }
  };

  Verification: AppRouteHandler<VerificationRoute> = async (context) => {
    const params = context.req.valid("json");

    const response = await this.service.Verification(params);

    setCookie(context, "jira-sh-auth", params.secret, {
      httpOnly: true,
      maxAge: AUTH_COOKIE_EXPIRES,
      sameSite: "strict",
      secure: true,
      expires: params.expire,
    });
    return context.json({
      payload: response.data,
      success: true,
    });
  };
}
