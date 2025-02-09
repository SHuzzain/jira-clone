import { createRouter } from "../utils/create-app";
import versionOneRoutes from "./v1/index";

const routes = createRouter().route("/v1", versionOneRoutes);

export default routes;
