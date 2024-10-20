import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Auth",
};

type Props = {
  children: React.ReactNode;
};

const AuthLayout = ({ children }: Props) => {
  return children;
};

export default AuthLayout;
