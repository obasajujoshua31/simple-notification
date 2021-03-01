const { expect } = require("chai");
const { generateJwtToken, verifyToken } = require("../../pkg/jwt");
const { tokenPayload } = require("../fixtures");
describe("JWT test", () => {
  it("should create token and get back same payload when decode", () => {
    const token = generateJwtToken(tokenPayload);

    const tokenDecoded = verifyToken(token);

    expect(tokenDecoded.accountType).to.equal(tokenPayload.accountType);
    expect(tokenDecoded.id).to.equal(tokenPayload.id);
    expect(tokenDecoded.firstName).to.equal(tokenPayload.firstName);
    expect(tokenDecoded.lastName).to.equal(tokenPayload.lastName);
    expect(tokenDecoded.email).to.equal(tokenPayload.email);
  });
});
