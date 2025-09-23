import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const { passwd } = getQuery(event)
  if (passwd !== useRuntimeConfig().manager_passwd) {
    return '密码错误'
  }
  // 直接在 SQL 层去掉小数点
  const issue_list = await prisma.$queryRaw`
    SELECT
      id,
      uid,
      name,
      class,
      problem,
      phone,
      split_part(reg_time, '.', 1) AS reg_time,
      split_part(app_time, '.', 1) AS app_time,
      closed,
      split_part(closed_time, '.', 1) AS closed_time
    FROM issues
    ORDER BY app_time DESC
    LIMIT 32
  `
  return issue_list
})