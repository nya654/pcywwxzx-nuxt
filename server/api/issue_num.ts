import { PrismaClient } from '@prisma/client'

export default defineEventHandler(async () => {
  try {
    const prisma = new PrismaClient();
    const count = await prisma.issue.count()
    console.log('Issue count:', count)
    return count
  } catch (e) {
    console.error('Error counting issues:', e)
    return 0
  }
})