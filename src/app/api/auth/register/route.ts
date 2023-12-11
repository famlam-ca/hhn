import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import { db } from "@/db";

export async function POST(request: Request) {
  try {
    const { name, full_name, email, password, passwordConfirm } =
      await request.json();

    if (!name || !full_name || !email || !password || !passwordConfirm) {
      return new NextResponse("Missing fields!", { status: 400 });
    }

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

    if (password !== passwordConfirm) {
      throw new Error("Passwords do not match");
    }

    const hashedPassword = await hash(password, 12);

    const res = await db.user.create({
      data: {
        name,
        full_name,
        email,
        password: hashedPassword,
      },
    });
  } catch (err) {
    throw new Error("Failed to create account! Please try again later.");
  }

  return NextResponse.json({ message: "success" });
}
