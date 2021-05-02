const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function registerValidator(data) {
  let errors = {};

  if (!data.hasOwnProperty("role")) {
    errors.message = "نقش کاربر را مشخص نمایید";
  }

  data.role = !isEmpty(data.role) ? data.role : "";
  if (Validator.isEmpty(data.role)) {
    errors.message = "نقش کاربر را مشخص نمایید";
  }

  data.mobile = !isEmpty(data.mobile) ? data.mobile : "";
  if (Validator.isEmpty(data.mobile)) {
    errors.message = "شماره تلفن همراه کاربر را وارد نمایید";
  }
  if (!Validator.isMobilePhone(data.mobile)) {
    errors.message = "شماره تلفن همراه معتبر نمی باشد";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
