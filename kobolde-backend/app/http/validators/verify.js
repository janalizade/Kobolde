const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateVerifyInput(data) {
  let errors = {};

  data.mobile = !isEmpty(data.mobile) ? data.mobile : "";
  data.verifyCode = !isEmpty(data.verifyCode) ? data.verifyCode : "";

  if (!Validator.isMobilePhone(data.mobile)) {
    errors.mobile = "شماره تلفن همراه صحیح وارد کنید";
  }

  if (Validator.isEmpty(data.mobile)) {
    errors.mobile = "شماره موبایل را وارد نمایید";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};