export const getFullAddress = (
  city: string,
  street: string,
  house: string,
  apartment?: string
) => {
  const address = `${city}, ${street} ${house}`;
  if (apartment) {
    return address + `, ${apartment}`;
  }
  return address;
};
