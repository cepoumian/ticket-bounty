import { prisma } from "@/lib/prisma";
import { SearchParams } from "../search-params";

export const getTickets = async (
  userId: string | undefined,
  searchParams: SearchParams,
) => {
  return await prisma.ticket.findMany({
    // Safe to do this as Prisma just ignores undefined values
    where: {
      userId,
      title: {
        contains: searchParams.search,
        mode: "insensitive",
      },
    },
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
