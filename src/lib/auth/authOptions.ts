import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient, User } from "@prisma/client";
import { compare } from "bcrypt";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: "/auth/sign-in",
    // signOut: "/auth/sign-out",
    // error: "/auth/error",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Email..." },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password...",
        },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user) {
          return null;
        }

        const passwordsMatch = await compare(
          credentials.password,
          user.password,
        );

        if (!passwordsMatch) {
          return null;
        }

        return {
          id: user.id + "",
          name: user.name,
          full_name: user.full_name,
          email: user.email,
          image: user.image,
          role: user.role,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    session: async ({ session, token, user }) => {
      // console.log("Session User:", user); // debug
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          full_name: token.full_name,
          role: token.role,
        },
      };
    },
    jwt: async ({ token, user }) => {
      // console.log("JWT User:", user); // debug
      if (user) {
        const u = user as unknown as User;
        return {
          ...u,
          ...token,
          id: u.id,
          full_name: u.full_name,
          role: u.role,
        };
      }
      return token;
    },
  },
};
