import crypto from "node:crypto";
import Chance from "chance";
import bcrypt from "bcryptjs";
import { jest } from "@jest/globals";
import { User } from "../../../src/commons/database/SQL/index.mjs";
import generateTestCases from "../../utils/generateTestCases.mjs";
import { registerUser } from "../../../src/serverless/functions/User/index.mjs";

const chance = new Chance();

describe("Users", () => {
  describe("#register", () => {
    const successStatusCode = 201;
    const validationErrorStatusCode = 500;

    const defaultUUID = chance.guid();
    const defaultHash = chance.hash();

    let createStub;

    beforeAll(() => {
      createStub = jest.spyOn(User, "create").mockImplementation();
      jest.spyOn(bcrypt, "hash").mockReturnValue(defaultHash);
      jest.spyOn(crypto, "randomUUID").mockReturnValue(defaultUUID);
    });

    afterAll(() => {
      jest.restoreAllMocks();
    });

    const mockRequestBody = {
      UserName: chance.name(),
      UserEmail: chance.email(),
      UserPhone: chance.phone(),
      UserAddress: chance.address(),
      UserPassword: chance.string({ length: 10 }),
    };

    it("should register an user successfully", async () => {
      const mockResponse = {
        ...mockRequestBody,
        UserID: defaultUUID,
        UserPasswordHash: defaultHash,
      };

      createStub.mockResolvedValue(mockResponse);

      const event = {
        body: mockRequestBody,
      };

      const result = await registerUser(event);
      const parsedBody = JSON.parse(result.body);

      expect(result.statusCode).toBe(successStatusCode);
      expect(parsedBody.status).toBe(true);
      expect(parsedBody.data).toEqual(mockResponse);

      const databaseBody = createStub.mock.calls[0][0];
      const { UserPassword, ...expectedDatabaseBody } = mockResponse;

      expect(databaseBody).toEqual(expectedDatabaseBody);
    });

    const requiredProperties = Object.keys(mockRequestBody);
    const missingPropertiesTestCases =
      generateTestCases.missingRequiredProperties(
        requiredProperties,
        mockRequestBody
      );

    it.each(missingPropertiesTestCases)(
      "should return an error if the request body is missing a required property: %p",
      async (missingPropertyBody, expectedStatus, expectedStatusCode) => {
        const event = { body: missingPropertyBody };

        const result = await registerUser(event);
        const parsedBody = JSON.parse(result.body);

        expect(parsedBody.status).toBe(expectedStatus);
        expect(result.statusCode).toBe(expectedStatusCode);
      }
    );

    const invalidProperties = [
      {
        UnexpectedProperty: chance.bool(),
        UserName: chance.pickone([null, undefined, [], {}]),
        UserPhone: chance.pickone([null, undefined, [], {}]),
        UserAddress: chance.pickone([null, undefined, [], {}]),
        UserPassword: chance.pickone([null, undefined, [], {}]),
        UserEmail: chance.pickone(["error", null, undefined, [], {}]),
      },
    ];

    it.each(invalidProperties)(
      "should return an error if the request body contains an invalid property: %p",
      async (invalidRequestProperty) => {
        const event = {
          body: { ...mockRequestBody, ...invalidRequestProperty },
        };
        const result = await registerUser(event);
        const parsedBody = JSON.parse(result.body);

        expect(parsedBody.status).toBe(false);
        expect(result.statusCode).toBe(validationErrorStatusCode);
      }
    );
  });

  // Similar transformations for the "#get" block
});
