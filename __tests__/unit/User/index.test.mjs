import assert from "node:assert";
import crypto from "node:crypto";
import { describe, it, beforeEach, afterEach, before, after } from "node:test";
import sinon from "sinon";
import bcrypt from "bcryptjs";
import { assertResponse } from "../../mocks/index.mjs";
import { User } from "../../../src/commons/database/SQL/index.mjs";
import { registerUser } from "../../../src/serverless/functions/User/index.mjs";

describe("Users", () => {
  let hashStub;
  let createStub;
  let randomUUIDStub;

  describe("#register", () => {
    const successStatusCode = 201;
    const validationErrorStatusCode = 500;
    const defaultUUID = "ee3f3c3b-c7d7-4250-9ab2-3a1d053927f1";
    const defaultHash =
      "$2a$10$kxOOrAYeU6eiOdgM5.PZn.jUDKBLG6ZVzpDb0JMARdz4veNt5UhjW";

    before(() => {
      randomUUIDStub = sinon.stub(crypto, "randomUUID").returns(defaultUUID);
      hashStub = sinon.stub(bcrypt, "hash").returns(defaultHash);
    });

    after(() => {
      randomUUIDStub.restore();
      hashStub.restore();
    });

    beforeEach(() => {
      createStub = sinon.stub(User, "create");
    });

    afterEach(() => {
      createStub.restore();
    });

    const mockRequestBody = {
      UserName: "John Doe",
      UserPhone: "123-456-7890",
      UserAddress: "123 Street",
      UserPassword: "password123",
      UserEmail: "johndoe@example.com",
    };

    it("should register a user successfully", async () => {
      const mockResponse = {
        ...mockRequestBody,
        UserID: defaultUUID,
        UserPasswordHash: defaultHash,
      };

      createStub.resolves(mockResponse);

      const event = {
        body: mockRequestBody,
      };

      const result = await registerUser(event);

      // Validating response
      assertResponse(result, successStatusCode, mockResponse);

      // Validating database
      assert.strictEqual(createStub.callCount, 1, "Unexpected number of calls");

      const databaseBody = createStub.getCall(0).firstArg;
      const { UserPassword, ...expectedDatabaseBody } = mockResponse;

      assert.deepStrictEqual(
        databaseBody,
        expectedDatabaseBody,
        "Unexpected database body"
      );
    });

    it("should return an error if the request body is missing a required property", async () => {
      const requiredProperties = Object.keys(mockRequestBody); // All the keys are required in this case

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

    it("should return an error if the request body contains an invalid property", async () => {
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
});
