import { clientV1 } from "@/lib/rpc";
import { useMutation } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

type ResponseType = InferResponseType<(typeof clientV1.auth.signup)["$post"]>;
type RequestType = InferRequestType<(typeof clientV1.auth.signup)["$post"]>;

export const useSignUp = () => {
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json }) => {
      const response = await clientV1.auth.signup.$post({ json });
      return await response.json();
    },
  });

  return mutation;
};
