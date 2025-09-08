import { prisma } from "@/lib/prisma";
import { ParsedSearchParams } from "../search-params";

export const getTickets = async (
  userId: string | undefined,
  searchParams: ParsedSearchParams,
) => {
  // Safe to do this as Prisma just ignores undefined values
  const where = {
    userId,
    title: {
      contains: searchParams.search,
      mode: "insensitive" as const,
    },
  };

  const skip = searchParams.page * searchParams.size;
  const take = searchParams.size;

  return await prisma.ticket.findMany({
    where,
    skip,
    take,
    orderBy: {
      // ...(searchParams.sort === "newest" && { createdAt: "desc" }),
      // ...(searchParams.sort === "bounty" && { bounty: "desc" }),
      [searchParams.sortKey]: searchParams.sortValue,
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
