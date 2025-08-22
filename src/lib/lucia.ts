import { prisma } from "@/lib/prisma";
import { hashToken } from "@/utils/crypto";

const SESSION_REFRESH_INTERVAL_MS = 1000 * 60 * 60 * 24 * 15; // 15d
const SESSION_MAX_DURATION_MS = SESSION_REFRESH_INTERVAL_MS * 2; // 30d

export const createSession = async (sessionToken: string, userId: string) => {
  const id = hashToken(sessionToken);
  const expiresAt = new Date(Date.now() + SESSION_MAX_DURATION_MS);
  await prisma.session.create({ data: { id, userId, expiresAt } });
  return { id, userId, expiresAt };
};

export const validateSession = async (sessionToken: string) => {
  const id = hashToken(sessionToken);

  const result = await prisma.session.findUnique({
    where: { id },
    include: { user: true },
  });

  if (!result) return { session: null, user: null };

  const { user, ...session } = result;

  // hard expiry
  if (Date.now() >= session.expiresAt.getTime()) {
    await prisma.session.delete({ where: { id } });
    return { session: null, user: null };
  }

  // soft refresh if within 15d of expiry
  if (Date.now() >= session.expiresAt.getTime() - SESSION_REFRESH_INTERVAL_MS) {
    session.expiresAt = new Date(Date.now() + SESSION_MAX_DURATION_MS);
    await prisma.session.update({
      where: { id },
      data: { expiresAt: session.expiresAt },
    });
  }

  return { session, user };
};

export const invalidateSession = (sessionId: string) =>
  prisma.session.delete({ where: { id: sessionId } });
