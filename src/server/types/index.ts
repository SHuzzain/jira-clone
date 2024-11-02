import { OpenAPIHono, RouteConfig, RouteHandler } from "@hono/zod-openapi";
import { Context, Env, ValidationTargets } from "hono";
import { PinoLogger } from "hono-pino";
import { z, ZodSchema } from "zod";

// for controller to service file

type HasUndefined<T> = undefined extends T ? true : false;

type Target = keyof ValidationTargets;

export type InputStructure<T extends ZodSchema, D extends Target> = {
  in: HasUndefined<z.input<T>> extends true
    ? {
        [K in D]?: z.input<T> extends ValidationTargets[K]
          ? z.input<T>
          : { [K2 in keyof z.input<T>]?: ValidationTargets[K][K2] };
      }
    : {
        [K in D]: z.input<T> extends ValidationTargets[K]
          ? z.input<T>
          : { [K2 in keyof z.input<T>]: ValidationTargets[K][K2] };
      };
  out: { [K in D]: z.input<T> };
};

export type HonoContext<
  D extends Target,
  T extends string,
  K extends ZodSchema,
  P extends Env = object
> = HasUndefined<P> extends true
  ? Context<object, T, InputStructure<K, D>>
  : Context<P, T, InputStructure<K, D>>;

//end

// create app

export interface AppBindings {
  Variables: {
    logger: PinoLogger;
  };
}

export type AppOpenAPI = OpenAPIHono<AppBindings>;

export type AppRouteHandler<R extends RouteConfig> = RouteHandler<
  R,
  AppBindings
>;
