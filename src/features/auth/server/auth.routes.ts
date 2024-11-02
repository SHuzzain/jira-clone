import AuthController from "./auth.controller";
import { signinSchema } from "../schema";
import { createRouter } from "@/server/utils/create-app";
import { createRoute } from "@hono/zod-openapi";
import * as HttpStatusCode from "stoker/http-status-codes";
import { JsonpayloadContent } from "@/server/utils/zod-response-schema";

const authController = new AuthController();

const signin = createRoute({
  path: "/signin",
  method: "post",
  responses: {
    [HttpStatusCode.OK]: JsonpayloadContent(signinSchema, "sign in decs"),
  },
});

// const signup = createRoute({
//   path: "/signin",
//   method: "post",
//   responses: {
//     [HttpStatusCode.OK]: jsonContent(
//       z.object({ message: z.string() }),
//       "sign in decs"
//     ),
//   },
// });

const authRouter = createRouter().openapi(signin, authController.SignIn);

export type SignInRoute = typeof signin;
// export type SignUpRoute = typeof signup;

// .post("/signin", zValidator("json", signinSchema), authController.SignIn)
// .post("/signup", zValidator("json", signinSchema), authController.SignIn);

export default authRouter;
