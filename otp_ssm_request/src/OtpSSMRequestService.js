const aws = require("aws-sdk");

const parameterStore = new aws.SSM();
const getParam = (param) => {
  return new Promise((res, rej) => {
    parameterStore.getParameter(
      {
        Name: param,
      },
      (err, data) => {
        if (err) {
          return rej(err.code);
        }
        return res(data);
      }
    );
  });
};

const getParamAll = () => {
  return new Promise((res, rej) => {
    parameterStore.describeParameters((err, data) => {
      if (err) {
        return rej(err.code);
      }
      return res(data);
    });
  });
};

class OtpSSMRequest {
  async OtpSSMRequestService(params, httpMethod) {
    const _responseData = {
      paramStoreData: "",
      requestId: "",
      message: "",
    };
    if (httpMethod === "GET") {
      try {
        let { otpParamsField } = params;
        let finalResult = [];
        if (otpParamsField.includes(",")) {
          const _arrParam = otpParamsField.split(",");
          for (const item in _arrParam) {
            const _result = (await getParam(_arrParam[item])).Parameter;
            finalResult.push(_result);
          }
        } else if (otpParamsField == "") {
          const _result = (await getParamAll()).Parameters;
          for (const item in _result) {
            finalResult.push(_result[item]);
          }
        } else {
          const _result = (await getParam(otpParamsField)).Parameter;
          finalResult.push(_result);
        }
        _responseData.message = "Successfully";
        _responseData.paramStoreData = finalResult;
        return _responseData;
      } catch (error) {
        throw error;
      }
    } else if (httpMethod === "PUT") {
      try {
        const _result = (await getParamAll()).Parameters;
        for (const item in params) {
          var paramsValue = {
            Name: item,
            Value: params[item],
            Overwrite: true,
            Type: "String",
          };
          const arrfilter = _result.filter((val) => val.Name === item);
          if (arrfilter.length > 0) {
            await parameterStore.putParameter(paramsValue).promise();
          }
          _responseData.message = "Update Successfully";
        }

        return _responseData;
      } catch (error) {
        _responseData.message = error;
        throw _responseData;
      }
    }
  }
}

module.exports = OtpSSMRequest;
