"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLogout } from "@/features/auth/invoke-api/use-logout";

export default function Home() {
  const { mutate } = useLogout();
  return (
    <div className="flex gap-4">
      <Input />
      <Button onClick={() => mutate()}>default</Button>
      <Button variant={"destructive"} disabled>
        destructive
      </Button>
      <Button variant={"ghost"}>ghost</Button>
      <Button variant={"outline"}>outline</Button>
      <Button variant={"muted"}>muted</Button>
      <Button variant={"secondary"}>secondary</Button>
      <Button variant={"teritary"}>teritary</Button>
    </div>
  );
}
