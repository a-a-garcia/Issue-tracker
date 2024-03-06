import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => {
  return new PrismaClient(
    // you can pass an object with a log property set to ['query'] to log all prisma queries on a page. remember to reset the dev server as prisma only get instantiated once on start
    // {
    //   log: ['query']
    // }
  )
}

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>
}

const prisma = globalThis.prisma ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma