import faker from "faker";
import fetchMock, { enableFetchMocks } from "jest-fetch-mock";
import { fetchDogs } from "./Fetcher";

enableFetchMocks();

const createImage = () => faker.image.imageUrl();
const createImages = () => new Array(5).fill(null).map(createImage);

const responseMessage = createImages();

const responseJSON = JSON.stringify({
  message: responseMessage,
});

describe("fetchDogs", () => {
  it("call fetch with correct arguments", async () => {
    fetchMock.mockResponseOnce(responseJSON);
    await fetchDogs(5);
    expect(fetchMock.mock.calls.length).toEqual(1);
    expect(fetchMock.mock.calls[0][0]).toEqual(`https://dog.ceo/api/breeds/image/random/5`);
  });
  it("return expected message", async () => {
    fetchMock.mockResponseOnce(responseJSON);
    const message = await fetchDogs(5);
    expect(message).toEqual(responseMessage);
  });
  it("returned message has expected length", async () => {
    fetchMock.mockResponseOnce(responseJSON);
    const message = await fetchDogs(5);
    expect(message).toHaveLength(5);
  });
});
