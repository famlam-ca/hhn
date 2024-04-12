import { Lucia } from "lucia";
import { cookies } from "next/headers";
import { cache } from "react";
import type { Session, User } from "lucia";

import { adapter } from "@/lib/db/adapter";
import { CustomUser } from "@/types";

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    expires: false,
    attributes: {
      secure: process.env.NODE_ENV === "production",
    },
  },
  getUserAttributes: (attributes) => {
    return {
      ...attributes,
    };
  },
});

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: CustomUser;
  }
}

export const validateSession = cache(
  async (): Promise<
    { user: User; session: Session } | { user: null; session: null }
  > => {
    const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;

    if (!sessionId) {
      return {
        user: null,
        session: null,
      };
    }

    const result = await lucia.validateSession(sessionId);

    try {
      if (result.session && result.session.fresh) {
        const sessionCookie = lucia.createSessionCookie(result.session.id);
        cookies().set(
          sessionCookie.name,
          sessionCookie.value,
          sessionCookie.attributes
        );
      }
      if (!result.session) {
        const sessionCookie = lucia.createBlankSessionCookie();
        cookies().set(
          sessionCookie.name,
          sessionCookie.value,
          sessionCookie.attributes
        );
      }
    } catch {
      // next.js throws when you attempt to set cookie when rendering page
    }
    return result;
  }
);