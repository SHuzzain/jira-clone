import { useMutation } from "@tanstack/react-query";

import { createAdminClient } from "@/lib/client/appwrite";

export const useLogout = () => {
  const mutation = useMutation({
    mutationFn: async () => {
      const { account } = await createAdminClient();
      await account.deleteSession("current");
      return {
        success: true,
      };
    },
  });

  return mutation;
};
