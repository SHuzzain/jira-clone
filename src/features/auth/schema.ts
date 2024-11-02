import { z } from "@hono/zod-openapi";

export const signinSchema = z
  .object({
    email: z.string().email().openapi({
      example: "jhon@gmail.com",
    }),
    password: z.string().min(8, "Minimum 8 characters").openapi({
      example: "12345678",
    }),
  })
  .openapi("SignIn");

export const signUpSchema = z
  .object({
    fullname: z.string().min(1, "Minimum 1 characters").openapi({
      example: "jhon cena",
    }),
    email: z.string().email().openapi({
      example: "jhon@gmail.com",
    }),

    password: z.string().min(8, "Minimum 8 characters").openapi({
      example: "12345678",
    }),

    confirmPassword: z.string().min(8, "Minimum 8 characters").openapi({
      example: "12345678",
    }),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "Passwords do not match",
        path: ["confirmPassword"],
      });
    }
  })
  .openapi("SignUp");
