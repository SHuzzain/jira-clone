import { cookies } from "next/headers";
import React from "react";

import VerifyCard from "@/features/auth/components/verify-card";

const VerifyPage = async () => {
  const cookieStore = await cookies();
  const userId = cookieStore.get("user$Id");

  return <VerifyCard userId={userId?.value as string} />;
};

export default VerifyPage;
