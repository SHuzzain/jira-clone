import React from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import DottedSeparator from "@/components/dotted-separator";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  name: z.string().trim().min(4),
  email: z.string().trim().min(4).email(),
  password: z.string().trim().min(8),
});

const SignUpCard = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  return (
    <Card className="shadow-none border-none md:w-[487px] size-full">
      <CardHeader className="flex justify-center items-center p-7 text-center">
        <CardTitle className="text-2xl">Sign Up</CardTitle>
        <CardDescription>
          By signing up, you agree to our{" "}
          <Link
            href={"/privacy"}
            className="hover:underline decoration-blue-700"
          >
            <span className="text-blue-700">Privacy Policy</span>
          </Link>{" "}
          and{" "}
          <Link href={"/terms"} className="hover:underline decoration-blue-700">
            <span className="text-blue-700">Terms of Service</span>
          </Link>
        </CardDescription>
      </CardHeader>
      <div className="mb-2 px-7">
        <DottedSeparator />
      </div>
      <CardContent className="p-7">
        <Form {...form}>
          <form className="space-y-4">
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input type="text" placeholder="Enter name" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter email address"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter password"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit" size={"lg"} className="w-full">
              Sign up
            </Button>
          </form>
        </Form>
      </CardContent>

      <div className="px-7">
        <DottedSeparator />
      </div>

      <CardContent className="flex flex-col gap-y-4 p-7">
        <Button variant={"secondary"} size={"lg"} className="w-full">
          <FcGoogle className="mr-2 size-5" />
          Login with Google
        </Button>

        <Button variant={"secondary"} size={"lg"} className="w-full">
          <FaGithub className="mr-2 size-5" />
          Login with Github
        </Button>
      </CardContent>

      <div className="px-7">
        <DottedSeparator />
      </div>

      <CardContent className="p-7 text-center">
        <p>
          Already have an account?{" "}
          <Link href="/sign-in" className="hover:underline decoration-blue-700">
            <span className="text-blue-700">Sign in</span>
          </Link>
        </p>
      </CardContent>
    </Card>
  );
};

export default SignUpCard;
