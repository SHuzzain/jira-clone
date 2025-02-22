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
    if (props.userId && props.secret && props.expire) {
      mutate(
        { json: props },
        {
          onSuccess: () => setStatus("Verification successful! Redirecting..."),
          onError: () => setStatus("Verification failed. Try again."),
        }
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.userId, props.secret, props.expire, mutate]);

  return (
    <div className="flex justify-center items-center bg-gray-100 px-4">
      <Card className="bg-white shadow-lg rounded-2xl w-[380px]">
        <CardHeader className="text-center">
          <CardTitle className="font-semibold text-2xl">Jira Clone</CardTitle>
          <CardDescription className="text-gray-600">{status}</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center py-6">
          {<BeatLoader color="#4F46E5" />}
        </CardContent>
        <CardFooter className="flex justify-center w-full">
          <Button
            disabled={isPending}
            onClick={() => mutate({ json: props })}
            className="shadow-lg w-full"
          >
            Retry
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default VerifyCard;
