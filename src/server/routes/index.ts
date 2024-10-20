import { Hono } from "hono";
import routerV1 from "./v1/index";
const app = new Hono().route("/v1", routerV1);

export default app;
