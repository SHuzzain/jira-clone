"use client";

import * as React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import { useVerify } from "../invoke-api/use-verify";
import { verificationSchema } from "../schema";

type VerifyProps = {
  userId: string;
};

function VerifyCard({ userId }: VerifyProps) {
  const { mutate } = useVerify();
  const form = useForm<z.infer<typeof verificationSchema>>({
    resolver: zodResolver(verificationSchema),
    defaultValues: {
      token: "",
      userId,
    },
  });

  function onSubmit(values: z.infer<typeof verificationSchema>) {
    console.log({ values });
    mutate({
      json: values,
    });
  }

  return (
    <div className="flex items-center justify-center bg-gray-100 px-4">
      <Card className="w-[380px] rounded-2xl bg-white shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-semibold">Jira Clone</CardTitle>
          <CardDescription className="text-gray-600">
            Enter the 6-digit OTP sent to your email
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col items-center space-y-6"
            >
              <FormField
                control={form.control}
                name="token"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <InputOTP
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        disabled={field.disabled}
                        ref={field.ref}
                        value={field.value}
                        maxLength={6}
                        containerClassName="mx-auto"
                      >
                        <InputOTPGroup>
                          <InputOTPSlot
                            index={0}
                            className="h-12 w-12 text-lg"
                          />
                          <InputOTPSlot
                            index={1}
                            className="h-12 w-12 text-lg"
                          />
                          <InputOTPSlot
                            index={2}
                            className="h-12 w-12 text-lg"
                          />
                        </InputOTPGroup>
                        <InputOTPSeparator />
                        <InputOTPGroup>
                          <InputOTPSlot
                            index={3}
                            className="h-12 w-12 text-lg"
                          />
                          <InputOTPSlot
                            index={4}
                            className="h-12 w-12 text-lg"
                          />
                          <InputOTPSlot
                            index={5}
                            className="h-12 w-12 text-lg"
                          />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <CardFooter className="w-full px-0">
                <Button type="submit" className="w-full shadow-lg">
                  Verify
                </Button>
              </CardFooter>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

export default VerifyCard;
