import { InferRequestType, InferResponseType } from "hono";
import { clientV1 } from "@/lib/rpc";
import { useMutation } from "@tanstack/react-query";

type ResponseType = InferResponseType<(typeof clientV1.auth.signin)["$post"]>;
type RequestType = InferRequestType<(typeof clientV1.auth.signin)["$post"]>;

export const useLogin = () => {
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json }) => {
      const response = await clientV1.auth.signin.$post({ json });
      return await response.json();
    },
  });

  return mutation;
};
