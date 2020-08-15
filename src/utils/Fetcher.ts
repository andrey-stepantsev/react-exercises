export const fetchImages = async (count: number): Promise<{ message: string[]; status: string }> => {
  const response = await fetch(`https://dog.ceo/api/breeds/image/random/${count}`);
  const responseJSON = await response.json();
  return responseJSON;
};
