const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const timestamp = require("mongoose-timestamp");

const OrderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  gangTime: {
    type: String,
  },
  workingHours: {
    type: String,
  },
  list: {
    type: String,
  },
  approved: {
    type: Boolean,
    default: false,
  },
  trackingNumber: {
    type: String,
  },
});

OrderSchema.plugin(timestamp);

module.exports = mongoose.model("Order", OrderSchema);
