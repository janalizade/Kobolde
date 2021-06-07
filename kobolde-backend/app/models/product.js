const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const timestamp = require("mongoose-timestamp");

const ProductSchema = new Schema({
  category: { type: Schema.Types.ObjectId, ref: "Category" },
  title: {
    type: String,
  },
  image: {
    type: String,
  },
  arbetsTid: {
    type: String,
  },
  
  serialNo:{
    type: String,
  },
  arbetsGang: {
     type: String
        },
  
});

ProductSchema.plugin(timestamp);

module.exports = mongoose.model("Product", ProductSchema);
