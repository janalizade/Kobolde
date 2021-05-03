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
  productModel.find({}).populate("products").exec((err, users) => {
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
async function getByCategoryId(req, res) {
  let categoryId=req.params["id"];
  let product=await (await productModel.find({category:categoryId}));
  if(!product)
    return res.status(400).json({message:"product is not Found"});
    if (product) {
      return res.status(200).json(product);
    }
}


async function getById(req, res) {
  productModel.findById(req.params.id).exec((err, user) => {
    if (err) {
      res.status(500).json({
        message: "Internal Server Error"
      });
    }
    if (user) {
      return res.status(200).json(user);
    }
    res.json({
      message: "موردی جهت نمایش وجود ندارد",
      success: false,
    });
  });
}


async function create(req, res) {
  let categoryId = req.params["id"];
  let category = await Category.findById(categoryId);
  if (!category)
    return res.status(400).json({
      message: "category id not found"
    });
  try{
    let product = new productModel({
    category: categoryId,
    title: req.body.title,
    quantity: req.body.quantity,
    //image: "http://bakuyacomplex.ir/" + req.file.path.replace(/\\/g, "/"),
    price: req.body.price
  });
  let createdProduct = await product.save();
  category.products.push(createdProduct._id);
  category.save();

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