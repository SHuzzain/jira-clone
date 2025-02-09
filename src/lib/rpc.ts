import { hc } from "hono/client";

import { Apptype } from "@/app/api/[[...route]]/route";
import env from "@/config/env";

const client = hc<Apptype>(env.NEXT_PUBLIC_BASE_URL);

const clientV1 = client.api.v1;

export { client, clientV1 };
