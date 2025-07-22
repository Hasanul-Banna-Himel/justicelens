export function PostID() {
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

export function commentNo() {
  let str = `#${new Date().getFullYear()}${new Date().getMonth()}${new Date().getDate()}`;
  for (let i = 0; i < 4; i++) {
    const x = Math.round(Math.random() * 10);
    str += x;
  }
  str += `${new Date().getMinutes() * new Date().getSeconds()}`;
  return str;
}
