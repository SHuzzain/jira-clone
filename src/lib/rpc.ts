import { hc } from "hono/client";
import { Apptype } from "@/app/api/[[...route]]/route";

const client = hc<Apptype>(process.env.NEXT_PUBLIC_BASE_URL!);

const clientV1 = client.api.v1;

export { client, clientV1 };
