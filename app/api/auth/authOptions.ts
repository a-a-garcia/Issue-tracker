import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@next-auth/prisma-adapter";
// ALWAYS MAKE SURE THIS IS "@/prisma/client" NOT "@prisma/client" or you will get errors!!!!
import prisma from "@/prisma/client";
import { NextAuthOptions } from 'next-auth'

const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
      providers: [
        GoogleProvider({
            // need `!` after each of these to tell next.js we ensured that these values exist
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        })
      ],
      session: {
        strategy: "jwt"
      }
}

export default authOptions