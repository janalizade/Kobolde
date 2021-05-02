const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function adminRegisterValidator(data) {
  let errors = {};

  if (!data.hasOwnProperty("role")) {
    errors.message = "نقش کاربر را مشخص نمایید";
  }

  data.role = !isEmpty(data.role) ? data.role : "";
  if (Validator.isEmpty(data.role)) {
    errors.message = "نقش کاربر را مشخص نمایید";
  }
  
  return {
    errors,
    isValid: isEmpty(errors),
  };
};
