import assert from "node:assert";
import crypto from "node:crypto";
import { describe, it, beforeEach, afterEach, before, after } from "node:test";
import sinon from "sinon";
import bcrypt from "bcryptjs";
import { User } from "../../../src/commons/database/SQL/index.mjs";
import { registerUser } from "../../../src/serverless/functions/User/index.mjs";

describe("Users", () => {
  let hashStub;
  let createStub;
  let randomUUIDStub;

  before(() => {
    randomUUIDStub = sinon
      .stub(crypto, "randomUUID")
      .returns("ee3f3c3b-c7d7-4250-9ab2-3a1d053927f1");
    hashStub = sinon
      .stub(bcrypt, "hash")
      .returns("$2a$10$kxOOrAYeU6eiOdgM5.PZn.jUDKBLG6ZVzpDb0JMARdz4veNt5UhjW");
  });

  after(() => {
    randomUUIDStub.restore();
    hashStub.restore();
  });

  beforeEach(async () => {
    createStub = sinon.stub(User, "create");
  });

  afterEach(async () => {
    createStub.restore();
  });

  describe("registerUser", () => {
    const successStatusCode = 201;
    const validationErrorStatusCode = 500;

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
        UserID: "ee3f3c3b-c7d7-4250-9ab2-3a1d053927f1",
        UserPasswordHash:
          "$2a$10$kxOOrAYeU6eiOdgM5.PZn.jUDKBLG6ZVzpDb0JMARdz4veNt5UhjW",
      };

      createStub.resolves(mockResponse);

      const event = {
        body: mockRequestBody,
      };

      const result = await registerUser(event);
      const parsedBody = JSON.parse(result.body);

      assert.strictEqual(
        result.statusCode,
        successStatusCode,
        "Unexpected status code"
      );
      assert.strictEqual(parsedBody.status, true, "Unexpected status");
      assert.deepStrictEqual(parsedBody.data, mockResponse, "Unexpected data");
      assert.strictEqual(createStub.callCount, 1, "Unexpected number of calls");

      const databaseBody = createStub.getCall(0).firstArg;

      assert.strictEqual(
        databaseBody.hasOwnProperty("UserPassword"),
        false,
        "UserPassword should not be present in the result"
      );
      assert.strictEqual(
        databaseBody.hasOwnProperty("UserPasswordHash"),
        true,
        "UserPasswordHash should be present in the result"
      );
      assert.strictEqual(
        databaseBody.hasOwnProperty("UserID"),
        true,
        "UserID should be present in the result"
      );
    });

    it("should return an error if the request body is missing a required property", async () => {
      const requiredProperties = Object.keys(mockRequestBody); // In this case, all the keys are required

      for (const key of Object.keys(mockRequestBody)) {
        const { [key]: ignoredValue, ...missingPropertyBody } = mockRequestBody;

        const event = { body: missingPropertyBody };
        const shouldReturnValidationError = requiredProperties.includes(key);

        const result = await registerUser(event);
        const parsedBody = JSON.parse(result.body);

        assert.strictEqual(
          result.statusCode,
          shouldReturnValidationError
            ? validationErrorStatusCode
            : successStatusCode,
          `Unexpected status code for ${key} validation`
        );
        assert.strictEqual(
          parsedBody.status,
          shouldReturnValidationError ? false : true,
          `Unexpected status for ${key} validation`
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
        const parsedBody = JSON.parse(result.body);

        assert.strictEqual(
          result.statusCode,
          validationErrorStatusCode,
          "Unexpected status code for invalid request body"
        );
        assert.strictEqual(
          parsedBody.status,
          false,
          "Unexpected status for invalid request body"
        );
      }
    });
  });
});
