export const setValueAsNumber = (value: unknown) => {
  if (value === "") return undefined;

  if (typeof value === "string" || typeof value === "number") {
    const num = Number(value);
    if (!isNaN(num)) return num;
  }

  return value;
};
