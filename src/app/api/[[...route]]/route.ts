import { Hono } from "hono";
import chainedRoute from "@/server/routes";
import { handle } from "hono/vercel";

export const runtime = "edge";

const app = new Hono().basePath("/api");

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const routes = app.route("/", chainedRoute);

export const GET = handle(app);
export const POST = handle(app);

export type Apptype = typeof routes;
