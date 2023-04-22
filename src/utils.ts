export const debounce = (func: Function, wait: number) => {
  let timeout: NodeJS.Timeout;
  const f = (...args: any[]) => {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), wait);
  };
  f.cancel = () => clearTimeout(timeout);
  return f;
};
