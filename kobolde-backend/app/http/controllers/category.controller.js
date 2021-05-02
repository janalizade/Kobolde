//models
const categoryModel = require("../../models/category");
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
  categoryModel.find({}).populate("products").exec((err, users) => {
    if (err) {
      res.status(500).json({ message: "Internal Server Error" });
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
  categoryModel.findById(req.params.id).exec((err, user) => {
    if (err) {
      res.status(500).json({ message: "Internal Server Error" });
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
        return res.json({ message: "ویرایش اطلاعات با موفقیت انجام شد" });
      } else {
        return res.json({ message: "موردی یافت نشد" });
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
      res.json({ message: "حذف اطلاعات با موفقیت انجام شد" });
    } else {
      res.json({ message: "موردی یافت نشد" });
    }
  });
}
