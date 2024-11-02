import { createRouter } from "@/server/utils/create-app";
import { createRoute } from "@hono/zod-openapi";
import { ResponseSchema } from "@/server/utils/zod-response-schema";
import { jsonContent } from "stoker/openapi/helpers";
import * as HttpStatusCode from "stoker/http-status-codes";
import AuthController from "./auth.controller";
import { signinSchema, signUpSchema } from "../schema";

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
    [HttpStatusCode.OK]: jsonContent(ResponseSchema, "sign in res"),
  },
});

const authRouter = createRouter()
  .openapi(signin, authController.SignIn)
  .openapi(signup, authController.SignUp);

export type SignInRoute = typeof signin;
export type SignUpRoute = typeof signup;

export default authRouter;
