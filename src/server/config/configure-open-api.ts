import { apiReference } from "@scalar/hono-api-reference";

import packageJSON from "../../../package.json";
import { AppOpenAPI } from "../types";

export default function configureOpenAPI(app: AppOpenAPI) {
  app.doc("/doc", {
    openapi: "3.0.0",
    info: {
      version: packageJSON.version,
      title: `${packageJSON.name} backend`,
    },
  });

  app.get(
    "/reference",
    apiReference({
      theme: "kepler",
      layout: "classic",
      defaultHttpClient: {
        clientKey: "axios",
        targetKey: "javascript",
      },
      spec: {
        url: "/api/doc",
      },
    })
  );
}
