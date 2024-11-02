import { notFound, onError } from "stoker/middlewares";
import { defaultHook } from "stoker/openapi";
import { OpenAPIHono } from "@hono/zod-openapi";
import { AppBindings } from "../types";
import { pinologgerMW } from "../middleware/pino-logger";

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
