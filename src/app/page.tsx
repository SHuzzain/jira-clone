import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex gap-4">
      <Input />
      <Button>default</Button>
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
