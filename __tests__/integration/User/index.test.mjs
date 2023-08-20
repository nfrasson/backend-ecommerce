import Chance from "chance";
import { callLocalLambda } from "../../utils/lambdaLocalInstance.mjs";

const chance = new Chance();

describe("Users - Integration", () => {
  describe("#register", () => {
    const successStatusCode = 201;

    const mockRequestBody = {
      UserName: chance.name(),
      UserEmail: chance.email(),
      UserPhone: chance.phone(),
      UserAddress: chance.address(),
      UserPassword: chance.string({ length: 10 }),
    };

    it("should register an user successfully", async () => {
      const event = {
        body: mockRequestBody,
      };

      const result = await callLocalLambda("registerUser", event);
      const parsedBody = JSON.parse(result.body);

      expect(parsedBody.status).toBe(true);
      expect(result.statusCode).toBe(successStatusCode);
    }, 30000);
  });
});
