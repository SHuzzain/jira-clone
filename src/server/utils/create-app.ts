import { OpenAPIHono } from "@hono/zod-openapi";
import { notFound, onError } from "stoker/middlewares";
import { defaultHook } from "stoker/openapi";

import { pinologgerMW } from "../middleware/pino-logger";
import { AppBindings } from "../types";

export function createRouter() {
  return new OpenAPIHono<AppBindings>({
    strict: false,
    defaultHook,
  });
}

export default function createApp() {
  const app = createRouter();
  app.use(pinologgerMW());
  app.onError(onError);
  app.notFound(notFound);

  return app;
}
