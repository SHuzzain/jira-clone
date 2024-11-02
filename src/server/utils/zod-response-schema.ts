import { jsonContent } from "stoker/openapi/helpers";
import { z } from "@hono/zod-openapi";
import { ZodSchema } from "zod";

type JsonResponse<T> = {
  payload: T;
  success: boolean;
};

export const ResponseSchema = z.object({
  success: z.boolean(),
});

export const JsonPayloadContent = <T>(
  schema: ZodSchema<T>,
  description: string
) => {
  return jsonContent(
    z.object({
      payload: schema,
      success: z.boolean(),
    }),
    description
  ) as {
    content: {
      "application/json": {
        schema: ZodSchema<JsonResponse<T>>;
      };
    };
    description: string;
  };
};
