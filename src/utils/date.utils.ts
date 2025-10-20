export function calculateAgeFromBirthDay(birthDay: string): number {
  if (!birthDay) return 0;

  const [day, month, year] = birthDay.split('-').map(Number);

  if (!day || !month || !year) return 0;

  const today = new Date();
  let age = today.getFullYear() - year;

  const hasNotHadBirthdayThisYear =
    today.getMonth() + 1 < month || (today.getMonth() + 1 === month && today.getDate() < month);

  if (hasNotHadBirthdayThisYear) age--;

  return age;
}
