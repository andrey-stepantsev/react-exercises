import fetchMock, { enableFetchMocks } from "jest-fetch-mock";
import { reducer, getData, defaultState, FetcherStatus } from "./Fetcher";

const dispatch = jest.fn();
const getState = jest.fn();

const testResponse = "Test";
const testError = new Error("Error Message");

enableFetchMocks();

describe("Fetcher reducer", () => {
  it("pending action changes the status to pending", () => {
    const action = { type: getData.pending.type };
    expect(reducer(defaultState, action).status).toEqual(FetcherStatus.PENDING);
  });
  it("fulfilled action changes the status to fulfilled and sets the response", () => {
    const action = { type: getData.fulfilled.type, payload: testResponse };
    const state = reducer(defaultState, action);
    expect(state.status).toEqual(FetcherStatus.FULFILLED);
    expect(state.response).toEqual(testResponse);
  });
  it("rejected action changes the status to rejected and sets the error", () => {
    const action = { type: getData.rejected.type, error: testError };
    const state = reducer(defaultState, action);
    expect(state.status).toEqual(FetcherStatus.REJECTED);
    expect(state.error).toEqual(testError.message);
  });
  it("correct getData dispatches the pending and fulfilled statuses", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(testResponse));
    await getData("https://response.com/")(dispatch, getState, {});
    expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({ type: getData.pending.type }));
    expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({ type: getData.fulfilled.type }));
  });
  it("incorrect getData dispatches the pending and rejected statuses", async () => {
    fetchMock.mockRejectOnce(testError);
    await getData("https://response.com/")(dispatch, getState, {});
    expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({ type: getData.pending.type }));
    expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({ type: getData.rejected.type }));
  });
});
