import { omit } from "./easy-3";

const user = {
  id: 1,
  name: "Andrey",
  phone: 79312131415,
  passport: { series: 1234, number: 111111 },
};

describe("Easy-3 test cases", () => {
  it("omit id from user", () => {
    const userExpected = { name: "Andrey", phone: 79312131415, passport: { series: 1234, number: 111111 } };
    expect(omit(user, "id")).toEqual(userExpected);
  });
  it("omit passport from user", () => {
    const userExpected = { id: 1, name: "Andrey", phone: 79312131415 };
    expect(omit(user, "passport")).toEqual(userExpected);
  });
  it("omit phone and passport from user", () => {
    const userWithoutPhone = { id: 1, name: "Andrey", passport: { series: 1234, number: 111111 } };
    expect(omit(user, "phone")).toEqual(userWithoutPhone);
    const userWithoutPhoneAndPassport = { id: 1, name: "Andrey" };
    expect(omit(userWithoutPhone, "passport")).toEqual(userWithoutPhoneAndPassport);
  });
});
