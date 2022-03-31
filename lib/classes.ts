export const classes = (
  ...classNames: (string | undefined | null | boolean)[]
) => {
  return classNames.filter(Boolean).join(" ");
};