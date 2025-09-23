export default defineEventHandler(async () => {
  try {
    const { PrismaClient } = await import('@prisma/client')
    let prisma = new PrismaClient()
    if (process.env.NODE_ENV === 'production') {
      const { withAccelerate } = await import('@prisma/extension-accelerate')
      prisma = prisma.$extends(withAccelerate())
    }
    const count = await prisma.issue.count()
    console.log('Issue count:', count)
    return count
  } catch (e) {
    console.error('Error counting issues:', e)
    return 0
  }
})