import NextAuth from "next-auth/next";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      username: string;
      first_name: string;
      last_name: string;
      email: string;

      image: string;
      banner: string;
      role: string;
      bio: string;
      theme: string;

      createdAt: Date;
      updatedAt: Date;
    };
  }
}
