import { handle } from "hono/vercel";

import app from "@/server/boostrap";

export const GET = handle(app);
export const POST = handle(app);

export type Apptype = typeof app;
