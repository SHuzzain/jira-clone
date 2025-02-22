import { useMutation } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import { createAdminClient } from "@/lib/client/appwrite";
import { clientV1 } from "@/lib/client/rpc";

type ResponseType = InferResponseType<(typeof clientV1.auth.signin)["$post"]>;
type RequestType = InferRequestType<(typeof clientV1.auth.signin)["$post"]>;

export const useLogin = () => {
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json }) => {
      const { account } = await createAdminClient();
      await account.createEmailPasswordSession(json.email, json.password);
      return {
        success: true,
      };
    },
  });

  return mutation;
};
