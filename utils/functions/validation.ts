export function validateEmail(email: string): boolean {
  const pattern = /^\d{4}-\d{1}-\d{2}-\d{3}@std\.ewubd\.edu$/;
  return pattern.test(email);
}

export function validateStudentIDReturnEmail(id: string): string {
  const pattern = /^\d{4}-\d{1}-\d{2}-\d{3}/;
  if (pattern.test(id)) return `${id}@std.ewubd.edu`;
  else return "";
}
