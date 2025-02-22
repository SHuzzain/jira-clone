import { setCookie } from "hono/cookie";
import * as HttpStatusCode from "stoker/http-status-codes";

import { env } from "@/config/env";
import { AppRouteHandler } from "@/server/types";

import { AUTH_COOKIE, AUTH_COOKIE_EXPIRES } from "../constants";
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

    setCookie(context, AUTH_COOKIE, response.data.secret, {
      httpOnly: true,
      maxAge: AUTH_COOKIE_EXPIRES,
      sameSite: "strict",
      secure: true,
      expires: new Date(response.data.expire),
      priority: "Medium",
      path: "/",
    });

    return context.json({
      payload: response.data,
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
    try {
      const params = context.req.valid("query");
      const response = await this.service.Verification(params);

      setCookie(context, AUTH_COOKIE, response.data.secret || params.secret, {
        httpOnly: true,
        maxAge: AUTH_COOKIE_EXPIRES,
        sameSite: "strict",
        secure: true,
        expires: new Date(params.expire),
        priority: "Medium",
        path: "/",
      });
      return context.redirect(env.NEXT_PUBLIC_BASE_URL);
    } catch (error) {
      return context.json(
        {
          success: false,
          error,
        },
        500
      );
    }
  };
}
