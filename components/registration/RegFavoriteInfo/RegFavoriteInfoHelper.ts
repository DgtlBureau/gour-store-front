export const isIdInList = (id: number, list: number[]) => {
  return list.some(item => item === id);
};
