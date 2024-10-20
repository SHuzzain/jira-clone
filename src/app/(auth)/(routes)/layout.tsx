"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const RouteLayout = ({ children }: Props) => {
  const pathname = usePathname();
  const isLogin = pathname === "/sign-in";
  return (
    <main className="bg-neutral-100 min-h-screen">
      <div className="mx-auto p-4 max-w-screen-2xl">
        <nav className="flex justify-between items-center">
          <Image src={"/logo.svg"} height={50} width={50} alt="logo" priority />
          <Button variant={"secondary"} asChild>
            <Link href={isLogin ? "/sign-up" : "/sign-in"}>
              {isLogin ? "Sign up" : "Sign in"}
            </Link>
          </Button>
        </nav>
      </div>

      <div className="flex flex-col justify-center items-center ~p-4/14">
        {children}
      </div>
    </main>
  );
};

export default RouteLayout;
