const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const timestamp = require("mongoose-timestamp");

const CategorySchema = new Schema({
  products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
  title: {
    type: String,
  },
  
});


CategorySchema.plugin(timestamp);

module.exports = mongoose.model("Category", CategorySchema);