import NextAuth from "next-auth/next";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string | null;
      first_name: string;
      last_name: string;
      email: string;

      image: string;
      role: $Enums.Role;

      createdAt: Date;
      updatedAt: Date;
    };
  }
}
