"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signIn } from "@/features/auth/actions";
import { signInSchema } from "@/features/auth/schemas";
import { actionToast } from "@/hooks/use-toast";
import { auth } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { FaGithub } from "react-icons/fa";
import { z } from "zod";

export function SignInForm() {
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof signInSchema>) {
    const data = await signIn(values);

    actionToast({ title: "Something went wrong...", actionData: data });
  }

  return (
    <div className="z-10 block">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-y-5 flex-col mb-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} type="email" placeholder="john.doe@email.com" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input {...field} type="password" placeholder="••••••••" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button size="lg" className="w-full" disabled={form.formState.isSubmitting} type="submit">
            Sign in
          </Button>
        </form>
      </Form>
      <Button
        size="lg"
        variant="secondary"
        className="w-full mb-8"
        disabled={form.formState.isSubmitting}
        type="button"
        onClick={async () => {
          await auth.signIn.social({
            provider: "github",
          });
        }}
      >
        <FaGithub />
        Sign in with Github
      </Button>
      <p className="text-sm text-center text-gray-600">
        Don&apos;t have an account?{" "}
        <Link
          href="/auth/sign-up"
          className="font-semibold text-emerald-700 hover:text-emerald-800"
        >
          Sign up
        </Link>
      </p>
    </div>
  );
}
