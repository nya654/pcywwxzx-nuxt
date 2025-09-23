import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();
export default defineEventHandler<Promise<string>>(async (event) => {
  const { passwd, id } = await getQuery(event)
  if (passwd !== useRuntimeConfig().manager_passwd) {
    return '密码错误'
  }
  await prisma.issue.delete({
    where: { id: parseInt(id as string) }
  })
  return '删除成功'
})