export async function fetchDogs(count: number): Promise<string[]> {
  const response = await fetch(`https://dog.ceo/api/breeds/image/random/${count}`);
  const responseJSON = await response.json();
  return responseJSON["message"];
}
