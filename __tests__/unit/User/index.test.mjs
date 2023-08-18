import crypto from "node:crypto";
import bcrypt from "bcryptjs";
import { jest } from "@jest/globals";
import { assertResponse } from "../../mocks/index.mjs";
import { User } from "../../../src/commons/database/SQL/index.mjs";
import { registerUser } from "../../../src/serverless/functions/User/index.mjs";

describe("Users", () => {
  let hashStub;
  let randomUUIDStub;
  describe("#register", () => {
    let createStub;
    const successStatusCode = 201;
    const validationErrorStatusCode = 500;
    const defaultUUID = "ee3f3c3b-c7d7-4250-9ab2-3a1d053927f1";
    const defaultHash =
      "$2a$10$kxOOrAYeU6eiOdgM5.PZn.jUDKBLG6ZVzpDb0JMARdz4veNt5UhjW";

    beforeAll(() => {
      createStub = jest.spyOn(User, "create").mockImplementation();
      hashStub = jest.spyOn(bcrypt, "hash").mockReturnValue(defaultHash);
      randomUUIDStub = jest
        .spyOn(crypto, "randomUUID")
        .mockReturnValue(defaultUUID);
    });

    afterAll(() => {
      jest.restoreAllMocks();
    });

    const mockRequestBody = {
      UserName: "John Doe",
      UserPhone: "123-456-7890",
      UserAddress: "123 Street",
      UserPassword: "password123",
      UserEmail: "johndoe@example.com",
    };

    test("should register a user successfully", async () => {
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

      assertResponse(result, successStatusCode, mockResponse);

      expect(createStub).toHaveBeenCalledTimes(1);

      const databaseBody = createStub.mock.calls[0][0];
      const { UserPassword, ...expectedDatabaseBody } = mockResponse;

      expect(databaseBody).toEqual(expectedDatabaseBody);
    });

    test("should return an error if the request body is missing a required property", async () => {
      const requiredProperties = Object.keys(mockRequestBody);

      for (const key of Object.keys(mockRequestBody)) {
        const { [key]: ignoredValue, ...missingPropertyBody } = mockRequestBody;

        const event = { body: missingPropertyBody };
        const shouldReturnValidationError = requiredProperties.includes(key);

        const result = await registerUser(event);

        assertResponse(
          result,
          shouldReturnValidationError
            ? validationErrorStatusCode
            : successStatusCode
        );
      }
    });

    test("should return an error if the request body contains an invalid property", async () => {
      const invalidRequestBodies = [
        {
          ...mockRequestBody,
          UserName: null,
        },
        {
          ...mockRequestBody,
          UserPhone: null,
        },
        {
          ...mockRequestBody,
          UserAddress: null,
        },
        {
          ...mockRequestBody,
          UserPassword: null,
        },
        {
          ...mockRequestBody,
          UserEmail: "invalid-email",
        },
        {
          ...mockRequestBody,
          InvalidProperty: "invalid-property", // Should return error on an unexpected property
        },
      ];

      for (const invalidRequestBody of invalidRequestBodies) {
        const event = { body: invalidRequestBody };

        const result = await registerUser(event);

        assertResponse(result, validationErrorStatusCode);
      }
    });
  });

  // Similar transformations for the "#get" block
});
