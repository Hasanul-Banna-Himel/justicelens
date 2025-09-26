export function PostID(): string {
  const S = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  const s = "abcdefghijklmnopqrstuvwxyz".split("");
  const n = "012345678901234567890123456789".split("");
  const arr = [...S, ...s, ...n];
  let str = "";
  const date = new Date().getTime();
  for (let i = 0; i < 8; i++) {
    const x = Math.round(Math.random() * arr.length - 1);
    str += arr[x] !== undefined && arr[x];
  }
  str += date;
  return str;
}

export const getAge = (birthDate: Date | string | undefined | null): number => {
  if (!birthDate) {
    return 0;
  }

  let dob: Date;

  if (birthDate instanceof Date) {
    dob = birthDate;
  } else if (typeof birthDate === 'string') {
    const parts = birthDate.split(/[./-]/);
    if (parts.length === 3) {
      let year, month, day;
      const p0 = parseInt(parts[0], 10);
      const p1 = parseInt(parts[1], 10);
      const p2 = parseInt(parts[2], 10);

      if (p2 > 1000) { // YYYY at the end
        year = p2;
        if (p0 > 12) { // DD/MM/YYYY
          day = p0;
          month = p1;
        } else { // Assume MM/DD/YYYY
          month = p0;
          day = p1;
        }
      } else if (p0 > 1000) { // YYYY at the start
        year = p0;
        month = p1;
        day = p2;
      } else {
        dob = new Date("invalid");
      }

      if (year && month && day) {
        dob = new Date(year, month - 1, day);
      } else {
        dob = new Date("invalid");
      }
    } else {
      dob = new Date(birthDate); // Fallback for other string formats
    }
  } else {
    dob = new Date("invalid");
  }

  if (isNaN(dob.getTime())) {
    return 0;
  }

  const today = new Date();

  if (dob > today) {
    return 0;
  }

  let age = today.getFullYear() - dob.getFullYear();
  const monthDifference = today.getMonth() - dob.getMonth();

  if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < dob.getDate())) {
    age--;
  }

  return age;
};