import { useMutation } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import { clientV1 } from "@/lib/client/rpc";

type ResponseType = InferResponseType<
  (typeof clientV1.auth.verification)["$get"]
>;
type RequestType = InferRequestType<
  (typeof clientV1.auth.verification)["$get"]
>;

export const useVerify = () => {
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ query }) => {
      const response = await clientV1.auth.verification.$get({ query });

      if (response.status === 307) {
        return {
          success: true,
          redirect: response.headers.get("Location"),
        };
      }
      return await response.json();
    },
  });

  return mutation;
};
