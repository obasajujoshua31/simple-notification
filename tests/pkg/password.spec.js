const { expect } = require("chai");
const { hashPassword, isMatchPassword } = require("../../pkg/password");

describe("Password test", () => {
  it("should hash password correctly and verify correctly", async () => {
    const passwordString = "test";
    const wrongPass = "fake";

    const hash = await hashPassword(passwordString);

    const isMatch = await isMatchPassword(passwordString, hash);

    const isNotMatch = await isMatchPassword(wrongPass, hash);

    expect(isMatch).to.be.true;
    expect(isNotMatch).to.be.false;
  });
});
