import { useMutation } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import { clientV1 } from "@/lib/client/rpc";

type ResponseType = InferResponseType<(typeof clientV1.auth.signup)["$post"]>;
type RequestType = InferRequestType<(typeof clientV1.auth.signup)["$post"]>;

export const useSignup = () => {
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json }) => {
      const response = await clientV1.auth.signup.$post({ json });
      return await response.json();
    },
  });

  return mutation;
};
