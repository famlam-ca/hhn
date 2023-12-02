import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import { db } from "@/db";

export async function POST(request: Request) {
  try {
    const { first_name, last_name, email, password } = await request.json();

    const user = await db.user.findFirst({
      where: {
        email,
      },
    });

    if (user) {
      throw new Error(
        "An account with that email already exists! Please sign in instead.",
      );
    }

    const hashedPassword = await hash(password, 10);

    const res = await db.user.create({
      data: {
        first_name,
        last_name,
        email,
        password: hashedPassword,
      },
    });
  } catch (err) {
    throw new Error("Failed to create account.");
  }

  return NextResponse.json({ message: "success" });
}
