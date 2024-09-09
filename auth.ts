import NextAuth from "next-auth";
import type { NextAuthConfig } from "next-auth";
import type { Adapter } from "next-auth/adapters";
import Resend from "next-auth/providers/resend";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { sendVerificationRequest } from "./lib/send-verification-request";
import prisma from "./prisma/db";

const authOptions: NextAuthConfig = {
    adapter: PrismaAdapter(prisma) as Adapter,
    providers: [
        Resend({
            from: "Acme onboarding@resend.dev",
            sendVerificationRequest: async (params) => {
                await sendVerificationRequest(params);
            },
        }),
    ],
    callbacks: {},
    pages: {
        signIn: "/login",
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.AUTH_SECRET,
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions);
