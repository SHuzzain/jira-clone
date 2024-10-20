import { Hono } from "hono";
import authRouter from "@/features/auth/server/auth.routes";

const app = new Hono().route("/auth", authRouter);

export default app;
