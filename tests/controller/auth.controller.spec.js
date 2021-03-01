const chai = require("chai");
const app = require("../../app");
const chaiHttp = require("chai-http");
const { tokenPayload } = require("../fixtures");
const { CREATED, BADREQUEST, OK } = require("../../api/constants");

chai.use(chaiHttp);

const { expect } = chai;

describe("Auth routes", () => {
  describe("Test signup", () => {
    it("should signup new user successfully", async () => {
      const testPayload = {
        ...tokenPayload,
        password: "test",
        phoneNumber: "9893883",
      };
      const response = await chai
        .request(app)
        .post("/auth/signup")
        .send(testPayload);

      expect(response.statusCode).to.equal(CREATED);
    });

    it("should fail while trying to signup with email already existing", async () => {
      const testPayload = {
        ...tokenPayload,
        password: "test",
        phoneNumber: "9893883",
      };
      const response = await chai
        .request(app)
        .post("/auth/signup")
        .send(testPayload);

      expect(response.statusCode).to.equal(BADREQUEST);
    });

    it("should fail while with invalid request body", async () => {
      const testPayload = {
        ...tokenPayload,
        phoneNumber: "9893883",
      };
      const response = await chai
        .request(app)
        .post("/auth/signup")
        .send(testPayload);

      expect(response.statusCode).to.equal(BADREQUEST);
    });
  });

  describe("Test login", () => {
    it("should succeed with good request payload", async () => {
      const response = await chai.request(app).post("/auth/login").send({
        email: "test@gmail.com",
        password: "test",
      });

      expect(response.statusCode).to.equal(OK);
    });

    it("should fail with bad request payload", async () => {
      const response = await chai.request(app).post("/auth/login").send({
        email: "test@test.com",
        password: "test",
      });

      expect(response.statusCode).to.equal(BADREQUEST);
      expect(response.text).to.equal("Invalid login details");
    });

    it("should fail with invalid request payload", async () => {
      const response = await chai.request(app).post("/auth/login").send({
        email: "test",
        password: "test",
      });

      expect(response.statusCode).to.equal(BADREQUEST);
    });
  });
});
