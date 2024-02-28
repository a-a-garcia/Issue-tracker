import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@next-auth/prisma-adapter";
// ALWAYS MAKE SURE THIS IS "@/prisma/client" NOT "@prisma/client" or you will get errors!!!!
import prisma from "@/prisma/client";

const handler = NextAuth({
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
})

export { handler as GET, handler as POST }