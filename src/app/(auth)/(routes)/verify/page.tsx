import React from "react";

import VerifyCard from "@/features/auth/components/verify-card";

type Props = {
  searchParams: Promise<{ userId: string; secret: string; expire: string }>;
};

const VerifyPage = async ({ searchParams }: Props) => {
  const params = await searchParams;

  return <VerifyCard {...params} expire={new Date(params.expire)} />;
};

export default VerifyPage;
