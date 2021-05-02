//models
const userModel = require("../../models/user");
const orderModel = require("../../models/order");
//validations
const adminLoginValidator = require("../validators/adminLoginValidator");
const adminRegisterValidator = require("../validators/adminRegisterValidator");
const jwt = require("jsonwebtoken");
const jwtDecode = require("jwt-decode");
const bcrypt = require("bcryptjs");

module.exports = {
  login,
  register,
  current,
  getAll,
  getById,
  create,
  update,
  remove,
  getUserOrders,
};

async function register(req, res) {
  const { errors, isValid } = adminRegisterValidator(req.body);
  const { firstName, lastName, email, password, role } = req.body;

  if (!isValid) {
    return res.status(400).json(errors);
  }

  try {
    let user = await userModel.findOne({ email });

    if (user) {
      return res.status(400).json({ message: "Email is already." });
    }

    user = new userModel({
      firstName,
      lastName,
      email,
      password,
      role,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();
    res.json({ message: "User susseccfully created", success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Internal Error" });
  }
}

async function login(req, res) {
  const { errors, isValid } = adminLoginValidator(req.body);
  const { email, password } = req.body;

  if (!isValid) {
    return res.status(400).json(errors);
  }

  try {
    let user = await userModel.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ message: "User not found", success: false });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "ّIncorrect email or password", success: false });
    }

    const payload = {
      user: {
        id: user.id,
        role: user.role,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "5 days" },
      (err, token) => {
        if (err) throw err;
        res.json({ token, id: user.id });
      }
    );
  } catch (error) {
    res.status(500).json({ message: "Server Internal Error" });
  }
}

async function current(req, res) {
  let token = req.get("x-auth-token");
  let decoded = jwtDecode(token);
  let userId = decoded.user.id;

  userModel.findById(userId, (err, user) => {
    if (err) throw err;
    if (user) {
      return res.status(200).json(user);
    } else {
      res.status(400).json({
        message: "موردی یافت نشد",
        success: false,
      });
    }
  });
}

async function getAll(req, res) {
  userModel.find({}).exec((err, users) => {
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
  userModel.findById(req.params.id).exec((err, user) => {
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
  const { errors, isValid } = itemValidator(req.body);
  const { title, content, type, media } = req.body;

  if (!isValid) {
    return res.status(400).json(errors);
  }

  try {
    let user = new userModel({
      title,
      content,
      type,
      media,
    });

    await user.save();
    res.json({ message: "کاربر با موفقیت ایجاد شد" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function update(req, res) {
  userModel.findByIdAndUpdate(
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
  userModel.findByIdAndRemove(req.params.id, (err, item) => {
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

async function getUserOrders(req, res) {
  orderModel
    .find({})
    .populate("user")
    .exec((err, orders) => {
      if (err) {
        res.status(500).json({ message: "Internal Server Error" });
      }
      if (orders) {
        return res.status(200).json(orders);
      }
      res.json({
        message: "Data Not Found",
        success: false,
      });
    });
}
