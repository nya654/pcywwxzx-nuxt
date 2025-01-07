export default defineEventHandler(async (event) => {
  const db = hubDatabase();
  const date_list = await db.prepare('SELECT app_time FROM issue').all();

  const weeks = new Set();
  date_list.results.forEach(result => {
    const date = new Date(result.app_time);
    const dayOfWeek = date.getDay();
    const diffToMonday = date.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
    date.setDate(diffToMonday);
    weeks.add(date.toISOString().split('T')[0]);
  });

  const lastDate = new Date(date_list.results[date_list.results.length - 1].app_time);
  const lastWeekDay = lastDate.getDay();
  const totalDays = (weeks.size - 1) * 5 + lastWeekDay;

  return totalDays;
});