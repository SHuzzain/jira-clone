import app from "@/server/boostrap";

import { handle } from "hono/vercel";
export const runtime = "edge";

export const GET = handle(app);
export const POST = handle(app);

export type Apptype = typeof app;
