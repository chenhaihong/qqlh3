// 是否是闰年
// 是 => true
// 否 => false
export default function isLeapYear(year: number): boolean {
  // 1,能被4整除而不能被100整除.
  // 2,能被400整除.
  const c0 = year % 4 === 0;
  const c1 = year % 100 !== 0;
  const c2 = year % 400 === 0;

  return (c0 && c1) || c2;
}

