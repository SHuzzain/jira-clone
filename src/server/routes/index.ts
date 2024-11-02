import versionOneRoutes from "./v1/index";
import { createRouter } from "../utils/create-app";

const routes = createRouter().route("/v1", versionOneRoutes);

export default routes;
