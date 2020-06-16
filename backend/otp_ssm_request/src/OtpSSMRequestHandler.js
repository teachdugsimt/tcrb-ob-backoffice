process.env.TIMEZONE = process.env.TIMEZONE
  ? process.env.TIMEZONE
  : "Asia/Bangkok";
process.env.DATETIMEFORMAT = process.env.DATETIMEFORMAT
  ? process.env.DATETIMEFORMAT
  : "YYYY-MM-DD HH:mm:ss";

const BuildResponse = require("utilitylayer/src/helper/BuildResponse");
const Service = require("./OtpSSMRequestService");

const _buildResponse = new BuildResponse();
const _service = new Service();

let headers

exports.handler = async (event, context) => {
  try {
    headers = event.headers
    const {httpMethod} = event;
    let body =
      httpMethod === "GET"
        ? event.queryStringParameters
        : httpMethod === "PUT"
        ? typeof event.body === "string"
          ? JSON.parse(event.body)
          : event.body
        : '';

    if(httpMethod === "POST" || httpMethod === "PATCH" || httpMethod === "DELETE" || !httpMethod){
      return await _buildResponse.Build(403, headers, "E2001", "Fail", "Forbidden", {})
    }

    let result = await _service.OtpSSMRequestService(body, httpMethod)
    return await _buildResponse.Build(200, headers, "S1002", "Successful", "Success", result)
  } catch (error) {
    return await _buildResponse.Build(402, headers, "E2001", "Fail", "Forbidden", error)
  }
};
