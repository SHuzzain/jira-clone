import { jsonContent } from "stoker/openapi/helpers";
import { z, ZodSchema } from "zod";

type JsonResponse<T> = {
  payload: T;
  success: boolean;
};

export const JsonpayloadContent = <T>(
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
