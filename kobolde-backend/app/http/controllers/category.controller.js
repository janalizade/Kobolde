//models
const categoryModel = require("../../models/category");
const product = require("../../models/product");
//validations
const categoryValidator = require("../validators/categoryValidator");

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};

async function getAll(req, res) {
  
  categoryModel.find({}).exec((err, categories) => {
    if (err) {
      res.status(500).json({ message: "Internal Server Error" });
    }
    if (categories) {
      return res.status(200).json(categories);
    }
    res.json({
      message: "Record not found",
      success: false,
    });
  });
}

async function getById(req, res) {
  let categoryId=req.params["id"];
  let category=await (await categoryModel.findById(categoryId));
  if(!category)
    return res.status(400).json({message:"category is not Found"});
    if (category) {
      return res.status(200).json(category);
    }
  /*(await categoryModel.findById(req.params.id)) => {
    if (err) {
      res.status(500).json({ message: "Internal Server Error" });
    }
    if (category) {
      return res.status(200).json(category);
    }
    res.json({
      message: "موردی جهت نمایش وجود ندارد",
      success: false,
    });
  });*/
}

async function create(req, res) {
  const { errors, isValid } = categoryValidator(req.body);
  const { title } = req.body;

  if (!isValid) {
    return res.status(400).json(errors);
  }

  try {
    let category = new categoryModel({
      title,
    });

    await category.save();
    res.json({ message: "Category added" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function update(req, res) {
  categoryModel.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    (err, user) => {
      if (err) {
        res.status(500).json({ message: "Internal Server Error" });
      }
      if (user) {
        return res.json({ message: "Record updated successfully" });
      } else {
        return res.json({ message: "Record not found" });
      }
    }
  );
}

async function remove(req, res) {
  categoryModel.findByIdAndRemove(req.params.id, (err, item) => {
    if (err) {
      res.status(500).json({ message: "Internal Server Error" });
    }
    if (item) {
      res.json({ message: "Record deleted successfully" });
    } else {
      res.json({ message: "Record not found" });
    }
  });
}
