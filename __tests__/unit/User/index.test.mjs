import crypto from "node:crypto";
import Chance from "chance";
import bcrypt from "bcryptjs";
import { jest } from "@jest/globals";
import { User } from "../../../src/commons/database/SQL/index.mjs";
import { registerUser } from "../../../src/serverless/functions/User/index.mjs";

const chance = new Chance();

describe("Users", () => {
  describe("#register", () => {
    let createStub;
    const successStatus = true;
    const failStatus = false;
    const successStatusCode = 201;
    const validationErrorStatusCode = 500;
    const defaultUUID = chance.guid();
    const defaultHash = chance.hash();

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

    it("should register a user successfully", async () => {
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
      expect(parsedBody.status).toBe(successStatus);
      expect(parsedBody.data).toEqual(mockResponse);

      const databaseBody = createStub.mock.calls[0][0];
      const { UserPassword, ...expectedDatabaseBody } = mockResponse;

      expect(databaseBody).toEqual(expectedDatabaseBody);
    });

    const requiredProperties = Object.keys(mockRequestBody);

    const missingPropertyTestCases = requiredProperties.map((key) => {
      const { [key]: ignoredValue, ...missingPropertyBody } = mockRequestBody;
      const shouldReturnValidationError = requiredProperties.includes(key);

      const expectedStatus = shouldReturnValidationError
        ? failStatus
        : successStatus;
      const expectedStatusCode = shouldReturnValidationError
        ? validationErrorStatusCode
        : successStatusCode;

      return [missingPropertyBody, expectedStatus, expectedStatusCode];
    });

    it.each(missingPropertyTestCases)(
      "should return an error if the request body is missing a required property: %p",
      async (missingPropertyBody, expectedStatus, expectedStatusCode) => {
        const event = { body: missingPropertyBody };

        console.log(missingPropertyBody, expectedStatus, expectedStatusCode);

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
        assertResponse(result, validationErrorStatusCode);
      }
    );
  });

  // Similar transformations for the "#get" block
});
