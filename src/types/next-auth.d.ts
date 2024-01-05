import NextAuth from "next-auth/next";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      full_name: string;
      email: string;

      image: string;
      role: $Enums.Role;

      createdAt: Date;
      updatedAt: Date;
    };
  }
}
