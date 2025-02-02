"use server";

import { signInSchema } from "@/features/auth/schemas";
import { auth } from "@/lib/auth";
import { APIError } from "better-auth/api";
import { z } from "zod";

export async function signIn(unsafeData: z.infer<typeof signInSchema>) {
  const { success, data } = signInSchema.safeParse(unsafeData);

  if (!success) {
    return {
      error: true,
      message: "There was an error logging in.",
    };
  }

  try {
    await auth.api.signInEmail({
      body: {
        email: data.email,
        password: data.password,
      },
    });

    return {
      error: false,
      message: "Successfully logged in.",
    };
  } catch (err) {
    if (err instanceof APIError) {
      return {
        error: true,
        message: err.body.message!,
      };
    }

    return {
      error: true,
      message: "There was an error logging in.",
    };
  }
}
