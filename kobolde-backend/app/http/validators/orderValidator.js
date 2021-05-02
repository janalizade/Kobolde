const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function orderValidator(data) {
  let errors = {};

  data.gangTime = !isEmpty(data.gangTime) ? data.gangTime : "";
  if (Validator.isEmpty(data.gangTime)) {
    errors.message = "ایمیل خود را وارد کنید";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
