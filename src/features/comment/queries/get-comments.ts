"use server";

import { getAuth } from "@/features/auth/queries/get-auth";
import { isOwner } from "@/features/auth/utils/is-owner";
import { prisma } from "@/lib/prisma";

export const getComments = async (
  ticketId: string,
  cursor?: { id: string; createdAt: number },
) => {
  const where = {
    ticketId,
  };

  const take = 2;
  const { user } = await getAuth();

  // eslint-disable-next-line prefer-const
  let [comments, count] = await prisma.$transaction([
    prisma.comment.findMany({
      where,
      take: take + 1,
      cursor: cursor
        ? { id: cursor.id, createdAt: new Date(cursor.createdAt) }
        : undefined,
      skip: cursor ? 1 : 0,
      include: { user: { select: { username: true } } },
      orderBy: [{ createdAt: "desc" }, { id: "desc" }],
    }),
    prisma.comment.count({ where }),
  ]);

  const hasNextPage = comments.length > take;

  // If there is a next page, remove the last item from the comments array since we have one extra item
  comments = hasNextPage ? comments.slice(0, -1) : comments;

  const lastComment = comments.at(-1);

  return {
    list: comments.map((comment) => ({
      ...comment,
      isOwner: isOwner(user, comment),
    })),
    metadata: {
      count,
      hasNextPage,
      cursor: lastComment
        ? {
            id: lastComment?.id,
            createdAt: lastComment?.createdAt.valueOf(),
          }
        : undefined,
    },
  };
};
