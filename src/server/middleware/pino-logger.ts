import env from "@/config/env";
import { pinoLogger } from "hono-pino";
import pino from "pino";

export function pinologgerMW() {
  return pinoLogger({
    pino: pino(
      env.NODE_ENV === "production"
        ? undefined
        : {
            level: env.LOG_LEVEL || "info",
            transport: {
              target: "pino-pretty",
              options: {
                colorize: true,
              }
            },
            
          }
    ),
    http: {
      reqId: () => crypto.randomUUID(),
    },
  });
}
