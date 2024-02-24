import { hash } from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

import { db } from "@/db";

export async function POST(request: NextRequest) {
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
      OR: [{ email }, { username }],
    },
  });

  if (user) {
    let message = "";
    if (user.email === email && user.username === username) {
      message = "An account with that email and username already exists!";
    } else if (user.email === email) {
      message = "An account with that email already exists!";
    } else if (user.username === username) {
      message = "An account with that username already exists!";
    }
    return new NextResponse(message, { status: 400 });
  }

  try {
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
  } catch (error: any) {
    // console.error("Error creating account..", error); // debug
    return new NextResponse(error, { status: 500 });
  }

  return NextResponse.json({ message: "success" });
}
