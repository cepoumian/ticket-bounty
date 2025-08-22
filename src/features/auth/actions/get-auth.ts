"use server";

import { cookies } from "next/headers";
import { cache } from "react";
import { lucia } from "@/lib/lucia";

export const getAuth = cache(async () => {
  const sessionId =
    (await cookies()).get(lucia.sessionCookieName)?.value || null;

  if (!sessionId) {
    return {
      user: null,
      session: null,
    };
  }

  const result = await lucia.validateSession(sessionId);

  // * If this is used in a React Server Component (RSC), it will throw an error
  // because cookies cannot be set in RSCs. In that case, we just return the result.
  try {
    // If the session is fresh, we create a new session cookie with the same ID
    // We're replacing the session in our DB; we get a session cookie and we can set it again
    // We're basically refreshing the session cookie so it gets a new expiration date
    if (result.session && result.session.fresh) {
      const sessionCookie = lucia.createSessionCookie(result.session.id);
      (await cookies()).set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes,
      );
    }
    // If there is no session, create a blank session cookie
    // We're invalidating the session
    if (!result.session) {
      const sessionCookie = lucia.createBlankSessionCookie();
      (await cookies()).set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes,
      );
    }
  } catch {
    // Do nothing if used in a RSC
  }

  return result;
});
