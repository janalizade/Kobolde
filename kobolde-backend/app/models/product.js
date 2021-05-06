const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const timestamp = require("mongoose-timestamp");

const ProductSchema = new Schema({
  categoryId:{
    type: String,
  } ,
  title: {
    type: String,
  },
  image: {
    type: String,
  },
  price: {
    type: String,
  },
  
  
  quantity: {
     type: Number
        },
  
});

ProductSchema.plugin(timestamp);

module.exports = mongoose.model("Product", ProductSchema);
