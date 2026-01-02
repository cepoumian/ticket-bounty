"use server";

import { prisma } from "@/lib/prisma";
import { getAuthOrRedirect } from "../queries/get-auth-or-redirect";

export const getUserStats = async () => {
  const { user } = await getAuthOrRedirect();

  const [ticketCount, commentCount] = await prisma.$transaction([
    prisma.ticket.count({ where: { userId: user.id } }),
    prisma.comment.count({ where: { userId: user.id } }),
  ]);

  return {
    ticketCount,
    commentCount,
  };
};
