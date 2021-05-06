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
      message: "موردی جهت نمایش وجود ندارد",
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
        return res.status(400).json({success: false , message: "product not found!"})
    }
  }
  )}


async function getByCategoryId(req, res) {
  let categoryId=req.params["id"];
  console.log(categoryId);
  productModel.find({'categoryId': categoryId}).then(product =>{
    console.log(product);
    if(product) {
         return res.status(200).json({success: true, product})
    } else {
        return res.status(400).json({success: false , message: "product not found!"})
    }
  }
  )}


async function create(req, res) {
  let categoryId = req.params["categoryId"];
  let category = await Category.findById(categoryId);
  if (!category)
    return res.status(400).json({
      message: "category id not found"
    });
  try{
    let product = new productModel({
    categoryId: categoryId,
    title: req.body.title,
    quantity: req.body.quantity,
    image:req.body.image, 
    //"http://bakuyacomplex.ir/" + req.file.path.replace(/\\/g, "/"),
    price: req.body.price
  });
  console.log(product);
   await product.save();
  //category.products.push(createdProduct._id);
  //category.save();

  /*let k=await category.update({
    _id: categoryId
  }, {
    $push: {
      products: createdProduct._id
    }
  });
*/
  console.log(category);
  return res.status(200).json({message: "done"});
}catch (error) {
  res.status(500).json({ message: "Internal Server Error" });
}
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
          message: "ویرایش اطلاعات با موفقیت انجام شد"
        });
      } else {
        return res.json({
          message: "موردی یافت نشد"
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
        message: "حذف اطلاعات با موفقیت انجام شد"
      });
    } else {
      res.json({
        message: "موردی یافت نشد"
      });
    }
  });
}