//models
const productModel = require("../../models/product");
const Category = require("../../models/category");
//validations
const categoryValidator = require("../validators/categoryValidator");

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  createAll,
  getByCategoryId,
};

async function getAll(req, res) {
  productModel.find({}).exec((err, users) => {
    if (err) {
      res.status(500).json({
        message: "Internal Server Error"
      });
    }
    if (users) {
      return res.status(200).json(users);
    }
    res.json({
      message: "Record not found",
      success: false,
    });
  });
}

async function getById(req, res) {
  let categoryId=req.params["categoryId"];
  console.log(categoryId);
  productModel.findOne({'categoryId': categoryId}).then(product =>{
    console.log(product);
    if(product) {
         return res.status(200).json({success: true, product})
    } else {
        return res.status(400).json({success: false , message: "Product not found!"})
    }
  }
  )}


async function getByCategoryId(req, res) {
  let categoryId=req.params["id"];
  console.log(categoryId);
  productModel.find({category: categoryId}).then(product =>{
    console.log(product);
    if(product) {
         return res.status(200).json({success: true, product})
    } else {
        return res.status(400).json({success: false , message: "product not found!"})
    }
  }
  )}

  async function createAll(req, res) {
    console.log("-----------> createAll")
    
    try {
      let product = new productModel({
        title: req.body.title,
        image: "http://localhost:8000/" + req.file.path.replace(/\\/g, "/"),
        serialNo:req.body.serialNo,
      });
      console.log("----------->"+ product.image);
      await product.save();
      res.json({ message: "Product added" });
    } catch (error) {
      console.log(error.message);
      res.status(400).json({ message: '${error.message}' });
    }
  }
   

async function create(req, res) {
    
   let category = Category.findById(req.body.category_id, (err, category) => {
     let product = new productModel({
      category: category._id,
      title: req.body.title,
      image: "http://localhost:8000/" + req.file.path.replace(/\\/g, "/"),
      quantity:req.body.quantity,
      price: req.body.price
    });

    product.save(err => {
      if (err) throw err;
      category.products.push(product._id);
      category.save();
      res.json({
        message: "Product Created",
        success: true
      });
    });
  });
}
  
async function update(req, res) {
  productModel.findByIdAndUpdate(
    req.params.id, {
      $set: req.body
    },
    (err, user) => {
      if (err) {
        res.status(500).json({
          message: "Internal Server Error"
        });
      }
      if (user) {
        return res.json({
          message: "Record updated successfully"
        });
      } else {
        return res.json({
          message: "Product not found"
        });
      }
    }
  );
}

async function remove(req, res) {
  productModel.findByIdAndRemove(req.params.id, (err, item) => {
    if (err) {
      res.status(500).json({
        message: "Internal Server Error"
      });
    }
    if (item) {
      res.json({
        message: "Record deleted successfully"
      });
    } else {
      res.json({
        message: "Record not found"
      });
    }
  });
}