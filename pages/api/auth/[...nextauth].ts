// https://next-auth.js.org/adapters/prisma

import NextAuth from "next-auth"
import EmailProvider from 'next-auth/providers/email'
import { NextApiHandler } from "next"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options);
export default authHandler;

const options = {
    providers: [
        EmailProvider({
            // maxAge: 24 * 60 * 60, // How long email links are valid for (default 24h)
            server: {
                host: process.env.SMTP_HOST,
                port: Number(process.env.SMTP_PORT),
                auth: {
                    user: process.env.SMTP_USER,
                    pass: process.env.SMTP_PASSWORD,
                }
            },
            from: process.env.SMTP_FROM,
        }),
    ],
    adapter: PrismaAdapter(prisma),
    secret: process.env.SECRET,
}
