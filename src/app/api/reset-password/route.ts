import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

import { db } from "@/lib/db";

export const GET = async (req: NextRequest) => {
  try {
    const url = new URL(req.url);
    const token = url.searchParams.get("token");
    if (!token) {
      return Response.json({ error: "Token does not exist." }, { status: 400 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      email: string;
      code: string;
    };

    const resetPasswordQueryResult = await db.resetPassword.findFirst({
      where: {
        userEmail: decoded.email,
        code: decoded.code,
      },
    });
    if (!resetPasswordQueryResult) {
      return Response.json({ error: "Invalid token" }, { status: 400 });
    }

    return Response.redirect(
      new URL(
        `${process.env.NEXT_URL!}/auth/reset-password?email=${decoded.email}&code=${decoded.code}`,
      ),
      302,
    );
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 400 });
  }
};
