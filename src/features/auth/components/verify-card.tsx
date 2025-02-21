"use client";

import * as React from "react";
import { BeatLoader } from "react-spinners";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useVerify } from "../invoke-api/use-verify";

type VerifyProps = {
  userId: string;
  secret: string;
  expire: Date;
};

function VerifyCard(props: VerifyProps) {
  const { mutate, isPending } = useVerify();
  const [status, setStatus] = React.useState("Verifying...");

  React.useEffect(() => {
    if (props.userId && props.secret) {
      mutate(
        { json: props },
        {
          onSuccess: () => setStatus("Verification successful! Redirecting..."),
          onError: () => setStatus("Verification failed. Try again."),
        }
      );
    }
  }, [props.userId, props.secret, mutate]);

  return (
    <div className="flex items-center justify-center bg-gray-100 px-4">
      <Card className="w-[380px] rounded-2xl bg-white shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-semibold">Jira Clone</CardTitle>
          <CardDescription className="text-gray-600">
            {status}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center py-6">
          {<BeatLoader color="#4F46E5" />}
        </CardContent>
        <CardFooter className="w-full  flex justify-center">
          <Button
            disabled={isPending}
            onClick={() => mutate({ json: props })}
            className="w-full shadow-lg"
          >
            Retry
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default VerifyCard;
