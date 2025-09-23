import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();
export default defineEventHandler(async () => {
  try {
    const count = await prisma.issue.count()
    console.log('Issue count:', count)
    return count
  } catch (e) {
    console.error('Error counting issues:', e)
    return 0
  }
})