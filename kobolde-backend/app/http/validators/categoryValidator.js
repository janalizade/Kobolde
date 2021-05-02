const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function categoryValidator(data) {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : "";
  if (Validator.isEmpty(data.title)) {
    errors.message = "title is require";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
