import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

import { lucia } from "@/lib/auth";
import { db } from "@/lib/db";

export const GET = async (req: NextRequest) => {
  try {
    const url = new URL(req.url);
    const searchParams = url.searchParams;
    const token = searchParams.get("token");

    if (!token) {
      return Response.json({ error: "Token does not exist." }, { status: 400 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      email: string;
      userId: string;
      code: string;
    };

    const emailVerificationQueryResult = await db.emailVerification.findFirst({
      where: {
        userId: decoded.userId,
        code: decoded.code,
      },
    });

    if (!emailVerificationQueryResult) {
      return Response.json({ error: "Invalid token" }, { status: 400 });
    }

    await db.emailVerification.delete({
      where: {
        id: emailVerificationQueryResult.id,
      },
    });

    await db.user.update({
      where: {
        email: decoded.email,
      },
      data: {
        isEmailVerified: true,
      },
    });

    const session = await lucia.createSession(decoded.userId, {
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
    });

    const sessionCookie = lucia.createSessionCookie(session.id);

    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );

    return Response.redirect(new URL(process.env.NEXT_URL!), 302);
  } catch (error: any) {
    return Response.json({ error: error?.message }, { status: 400 });
  }
};
