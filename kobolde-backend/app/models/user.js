const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const timestamp = require("mongoose-timestamp");

const UserSchema = new Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
    sparse: true,
  },
  password: {
    type: String,
  },
  active: {
    type: Boolean,
    default: true,
  },
  role: {
    type: String,
    required: true,
    default: "user",
  },
  orders: [{ type: Schema.Types.ObjectId, ref: "Order" }],
});

UserSchema.plugin(timestamp);

module.exports = mongoose.model("User", UserSchema);
