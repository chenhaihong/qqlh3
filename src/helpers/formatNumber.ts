export default function formatNumber(num: number): number | string {
  if (num > 999) {
    const a = (num + "").split("");
    const b = [];

    for (let i = 0, l = a.length; i < l; i = i + 3) {
      if (a.length >= 3) {
        let c = a.pop() + "";
        c = a.pop() + c;
        c = a.pop() + c;
        b.unshift(c);
      }
    }

    if (a.length > 0) {
      const c = a.join("");
      b.unshift(c);
    }

    return b.join(",");
  } else {
    return num;
  }
}
