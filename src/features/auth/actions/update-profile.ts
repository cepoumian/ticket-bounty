"use server";

import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import {
  ActionState,
  fromErrorToActionState,
  toActionState,
} from "@/components/form/utils/to-action-state";
import { prisma } from "@/lib/prisma";
import { accountProfilePath } from "@/paths";
import { getAuthOrRedirect } from "../queries/get-auth-or-redirect";

const updateProfileSchema = z.object({
  username: z
    .string()
    .min(1, { message: "Username is required" })
    .max(191)
    .refine((value) => !value.includes(" "), "Username cannot contain spaces"),
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .max(191)
    .email("Invalid email format"),
});

export const updateProfile = async (
  _actionState: ActionState,
  formData: FormData,
) => {
  const { user } = await getAuthOrRedirect();

  try {
    const data = updateProfileSchema.parse({
      username: formData.get("username"),
      email: formData.get("email"),
    });

    await prisma.user.update({
      where: { id: user.id },
      data,
    });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      const target = (error.meta?.target as string[])?.[0];

      if (target === "username") {
        return toActionState(
          "ERROR",
          "This username is already taken",
          formData,
        );
      }

      if (target === "email") {
        return toActionState("ERROR", "This email is already in use", formData);
      }

      return toActionState(
        "ERROR",
        "Either email or username is already in use",
        formData,
      );
    }

    return fromErrorToActionState(error, formData);
  }

  revalidatePath(accountProfilePath());

  return toActionState("SUCCESS", "Profile updated successfully");
};
