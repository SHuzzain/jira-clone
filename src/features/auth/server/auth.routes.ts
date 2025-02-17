import { createRoute } from "@hono/zod-openapi";
import * as HttpStatusCode from "stoker/http-status-codes";
import { jsonContent } from "stoker/openapi/helpers";

import { createRouter } from "@/server/utils/create-app";
import {
  ErrorSchema,
  ResponseSchema,
} from "@/server/utils/zod-response-schema";

import { signUpSchema, signinSchema, verificationSchema } from "../schema";
import AuthController from "./auth.controller";

const authController = new AuthController();

const tags = ["Auth"];

const signin = createRoute({
  tags: tags,
  path: "/signin",
  method: "post",
  request: {
    body: jsonContent(signinSchema, "sign in res"),
  },
  responses: {
    [HttpStatusCode.OK]: jsonContent(ResponseSchema, "sign in res"),
  },
});

const signup = createRoute({
  tags: tags,
  path: "/signup",
  method: "post",
  request: {
    body: jsonContent(signUpSchema, "sign in res"),
  },
  responses: {
    [HttpStatusCode.OK]: jsonContent(ResponseSchema, "sign up response"),
    [HttpStatusCode.INTERNAL_SERVER_ERROR]: jsonContent(
      ErrorSchema,
      "sign up internal server error"
    ),
  },
});

const verification = createRoute({
  tags: tags,
  path: "/verification",
  method: "post",
  request: {
    body: jsonContent(verificationSchema, "verification token"),
  },
  responses: {
    [HttpStatusCode.OK]: jsonContent(ResponseSchema, "verify response"),
  },
});

const authRouter = createRouter()
  .openapi(signin, authController.SignIn)
  .openapi(signup, authController.SignUp)
  .openapi(verification, authController.Verification);

export type SignInRoute = typeof signin;
export type SignUpRoute = typeof signup;
export type VerificationRoute = typeof verification;

export default authRouter;
