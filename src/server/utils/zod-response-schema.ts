import { z } from "@hono/zod-openapi";
import { jsonContent } from "stoker/openapi/helpers";
import { ZodSchema } from "zod";

export const ResponseSchema = z.object({
  success: z.boolean(),
});

export const ErrorSchema = z.object({
  success: z.boolean(),
  error: z.unknown(),
});

export const JsonPayloadResponse = <T extends ZodSchema>(
  schema: T,
  description: string
) => {
  return jsonContent(
    z.object({
      payload: schema,
      success: z.boolean(),
    }),
    description
  );
};
