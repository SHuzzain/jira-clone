import { Hono } from "hono";
import AuthController from "./auth.controller";
import { signinSchema } from "../schema";
import { zValidator } from "@hono/zod-validator";

const authController = new AuthController();

const router = new Hono()
  .post("/signin", zValidator("json", signinSchema), authController.SignIn)
  .post("/signup", zValidator("json", signinSchema), authController.SignIn);

export default router;
