import configureOpenAPI from "./config/configure-open-api";
import routes from "./routes";
import createApp from "./utils/create-app";

const app = createApp().basePath("/api").route("/", routes);

configureOpenAPI(app);

export default app;
