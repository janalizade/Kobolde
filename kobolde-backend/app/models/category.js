const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const timestamp = require("mongoose-timestamp");

const CategorySchema = new Schema({
  title: {
    type: String,
  },
  
});


CategorySchema.plugin(timestamp);

module.exports = mongoose.model("Category", CategorySchema);