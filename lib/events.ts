export const preventDefault = (e: any) => {
  if (!e) return;
  if (typeof e.preventDefault === 'function') {
    e.preventDefault();
  }
  if (typeof e.stopPropagation === 'function') {
    e.stopPropagation();
  }
};