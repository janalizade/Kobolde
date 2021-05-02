const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateLogin(data) {
  let errors = {};

  data.mobile = !isEmpty(data.mobile) ? data.mobile : "";

  if (!Validator.isMobilePhone(data.mobile)) {
    errors.mobile = "شماره تلفن همراه صحیح وارد کنید";
  }

  if (Validator.isEmpty(data.mobile)) {
    errors.mobile = "وارد کردن شماره تلفن همراه الزامی است";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
