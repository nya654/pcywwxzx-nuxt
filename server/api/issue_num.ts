import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();
export default defineEventHandler(async () => {
  try {
    const count = await prisma.issue.count()
    return count
  } catch (e) {
    return 0
  }
})