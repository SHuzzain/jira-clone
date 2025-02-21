import React from "react";

import VerifyCard from "@/features/auth/components/verify-card";

type Props = {
  searchParams: Promise<{ userId: string, secret: string, expire: string; }>
}

const VerifyPage = async ({ searchParams }: Props) => {
  const { secret, userId, expire } = await searchParams;

  console.log({ secret, userId, expire })

  return <VerifyCard userId={userId} secret={secret} expire={new Date(expire)} />;
};

export default VerifyPage;
