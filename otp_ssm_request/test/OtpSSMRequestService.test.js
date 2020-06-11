const appService = require("../src/OtpSSMRequestService");
const _app = new appService();
jest.setTimeout(150000);

describe("Otp parameter stores Handler Unit Test", () => {
  beforeAll(async () => {});
  beforeEach(() => {});
  afterAll(async () => {});

  test("should be return request result SSM when Params did work correct", async () => {
    const event = {
      headers: {},
      httpMethod: "GET",
      queryStringParameters: {
        otpParamsField: "OTP_EXPIRE_TIME",
      },
    };
    let result = await _app.OtpSSMRequestService(
      event.queryStringParameters,
      event.httpMethod
    );
    expect(result.message).toBe('Successfully');
  });

  test("should be return update result SSM when Params did work correct", async () => {
    const event = {
      headers: {},
      httpMethod: "PUT",
      body: {
        OTP_EXPIRE_TIME: "30",
        OTP_MAXIMUM_ENTERED: "5",
      },
    };
    let result = await _app.OtpSSMRequestService(
      event.body,
      event.httpMethod
    );

    expect(result.message).toBe('Update Successfully');
  });


  test("should be return request error SSM when Params incorrect", async () => {
    const event = {
      headers: {},
      httpMethod: "GET",
      queryStringParameters: {
        otpParamsField: "Mock_Trst",
      },
    };
    let result, error;

    try {
      result = await _app.OtpSSMRequestService(
        event.queryStringParameters,
        event.httpMethod
      );
    } catch (err) {
      error = err;
    }
    expect(error).toBe('ParameterNotFound');
  });

  test("should be return request error SSM when Params incorrect format", async () => {
    const event = {
      headers: {},
      httpMethod: "GET",
      queryStringParameters: {
        otpParamsField: "OTP_EXPIRE_TIME:Mock",
      },
    };
    let result, error;

    try {
      result = await _app.OtpSSMRequestService(
        event.queryStringParameters,
        event.httpMethod
      );
    } catch (err) {
      error = err;
    }
    expect(error).toBe('ParameterVersionNotFound');
  });


  test("should be return update error SSM when Params incorrect", async () => {
    const event = {
      headers: {},
      httpMethod: "PUT",
      body: {
        OTP_EXPIRE_TIME_MOCK: "15",
      },
    };

    let result, error;

    try {
      result = await _app.OtpSSMRequestService(
        event.body,
        event.httpMethod
      );
    } catch (err) {
      error = err;
    }

    expect(result.message).toBe('Update Successfully');
  });
});
