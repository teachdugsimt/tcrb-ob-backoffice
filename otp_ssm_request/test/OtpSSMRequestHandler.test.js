process.env.DEV = "UT";
const appHandler = require("../src/OtpSSMRequestHandler");

jest.setTimeout(150000);

describe("Otp parameter stores Handler Unit Test", () => {
  beforeAll(async () => {});
  beforeEach(() => {});
  afterAll(async () => {});

  test("should be return One result SSM when `GET` did work correct", async () => {
    const event = {
      headers: {},
      httpMethod: "GET",
      queryStringParameters: {
        otpParamsField: "OTP_EXPIRE_TIME",
      },
    };
    let result = await appHandler.handler(event);
    expect(result.statusCode).toBe(200);
  });

  test("should be return Muti result SSM when `GET` did work correct", async () => {
    const event = {
      headers: {},
      httpMethod: "GET",
      queryStringParameters: {
        otpParamsField:
          "OTP_EXPIRE_TIME,OTP_MAXIMUM_ENTERED,OTP_TOKEN_EXPIRE_TIME",
      },
    };
    let result = await appHandler.handler(event);
    expect(result.statusCode).toBe(200);
  });

  test("should be return All result SSM when `GET` did work correct", async () => {
    const event = {
      headers: {},
      httpMethod: "GET",
      queryStringParameters: {
        otpParamsField: "",
      },
    };
    let result = await appHandler.handler(event);
    expect(result.statusCode).toBe(200);
  });

  test("should be return result SSM when `PUT` did work correct", async () => {
    const event = {
      headers: {},
      httpMethod: "PUT",
      body: {
        OTP_EXPIRE_TIME: "15",
        OTP_MAXIMUM_ENTERED: "3",
      },
    };
    let result = await appHandler.handler(event);
    expect(result.statusCode).toBe(200);
  });

  test("should be return error SSM when http method incorrect", async () => {
    const event = {
      headers: {},
      httpMethod: "POST",
      queryStringParameters: {
        otpParamsField: "",
      },
    };
    let result = await appHandler.handler(event);
    expect(result.statusCode).toBe(403);
  });

  test("should be return error SSM when param incorrect", async () => {
    let result = await appHandler.handler();
    expect(result.statusCode).toBe(402);
  });
});
