"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

import { Button } from "@/components/ui/button";

type Props = {
  children: React.ReactNode;
};

const RouteLayout = ({ children }: Props) => {
  const pathname = usePathname();
  const isLogin = pathname === "/sign-in";
  return (
    <main className="min-h-screen bg-neutral-100">
      <div className="mx-auto max-w-screen-2xl p-4">
        <nav className="flex items-center justify-between">
          <Image src={"/logo.svg"} height={50} width={50} alt="logo" priority />
          <Button variant={"secondary"} asChild>
            <Link href={isLogin ? "/sign-up" : "/sign-in"}>
              {isLogin ? "Sign up" : "Sign in"}
            </Link>
          </Button>
        </nav>
      </div>

      <div className="flex flex-col items-center justify-center ~p-4/14">
        {children}
      </div>
    </main>
  );
};

export default RouteLayout;
