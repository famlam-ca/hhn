import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import { db } from "@/db";

export async function POST(request: Request) {
  try {
    const {
      display_name,
      username,
      first_name,
      last_name,
      email,
      password,
      passwordConfirm,
    } = await request.json();

    if (!display_name || !username || !email || !password || !passwordConfirm) {
      return new NextResponse("Missing fields!", { status: 400 });
    }

    if (passwordConfirm !== password) {
      return new NextResponse("Passwords must match");
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

    const hashedPassword = await hash(password, 12);

    await db.user.create({
      data: {
        display_name,
        username,
        first_name,
        last_name,
        email,
        password: hashedPassword,
      },
    });
  } catch (error) {
    throw new Error("Failed to create account! Please try again later.");
  }

  return NextResponse.json({ message: "success" });
}
