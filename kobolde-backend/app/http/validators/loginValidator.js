const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function loginValidator(data) {
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : "";
  if (Validator.isEmpty(data.email)) {
    errors.message = "ایمیل خود را وارد کنید";
  }

  if (!Validator.isEmail(data.email)) {
    errors.message = "ایمیل شما معتبر نمی باشد";
  }

  data.password = !isEmpty(data.password) ? data.password : "";
  if (Validator.isEmpty(data.password)) {
    errors.message = "رمز عبور خود را وارد کنید";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
