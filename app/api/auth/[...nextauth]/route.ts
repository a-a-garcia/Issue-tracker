import NextAuth from "next-auth"
import authOptions from "../authOptions"

// if you get compilation error here, need to make sure authOptions is of type { NextAuthOptions }
const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }