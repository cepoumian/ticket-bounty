"use server";

import { hash } from "@node-rs/argon2";
import { Prisma } from "@prisma/client";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import {
  ActionState,
  fromErrorToActionState,
  toActionState,
} from "@/components/form/utils/to-action-state";
import { lucia } from "@/lib/lucia";
import { prisma } from "@/lib/prisma";
import { ticketsPath } from "@/paths";

const signUpSchema = z
  .object({
    username: z
      .string()
      .min(1)
      .max(191)
      .refine(
        (value) => !value.includes(" "),
        "Username cannot contain spaces",
      ),
    email: z.string().min(1, { message: "Is required" }).max(191).email(),
    password: z.string().min(6).max(191),
    confirmPassword: z.string().min(6).max(191),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: "custom",
        message: "Passwords do not match",
        path: ["confirmPassword"],
      });
    }
  });

export const signUp = async (_actionState: ActionState, formData: FormData) => {
  try {
    // Parse and validate the form data using the signUpSchema
    const { username, email, password } = signUpSchema.parse(
      Object.fromEntries(formData),
    );

    // Hash the password using argon2
    const passwordHash = await hash(password);

    // Create the user in the database
    const user = await prisma.user.create({
      data: {
        username,
        email,
        passwordHash,
      },
    });
    // Create a session for the user in our DB using Lucia
    const session = await lucia.createSession(user.id, {});
    // Create a session cookie using Lucia
    const sessionCookie = lucia.createSessionCookie(session.id);

    // Set the session cookie using Next.js cookies API
    (await cookies()).set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return toActionState(
        "ERROR",
        "Username or email already exists",
        formData,
      );
    }
    return fromErrorToActionState(error, formData);
  }

  redirect(ticketsPath());
};
