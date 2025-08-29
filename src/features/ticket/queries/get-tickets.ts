import { prisma } from "@/lib/prisma";

export const getTickets = async (userId: string | undefined) => {
  return await prisma.ticket.findMany({
    // Safe to do this as Prisma just ignores undefined values
    where: { userId },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      user: {
        select: {
          username: true,
        },
      },
    },
  });
};
