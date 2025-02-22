"use client";

import React from "react";

import { Toaster } from "../ui/sonner";
import QueryProviders from "./tanstack-query-provider";

type Props = {
  children: React.ReactNode;
};

const Provider = ({ children }: Props) => {
  return (
    <>
      <QueryProviders>{children}</QueryProviders>;
      <Toaster />
    </>
  );
};

export default Provider;
