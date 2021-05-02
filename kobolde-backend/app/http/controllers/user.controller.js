// const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtDecode = require("jwt-decode");
const generatePassword = require("generate-password");
const nodemailer = require("nodemailer");
//models
const userModel = require("../../models/user");
const orderModel = require("../../models/order");
//validations
const orderValidator = require("../validators/orderValidator");

module.exports = {
  register,
  login,
  current,
  orderRequest,
};

async function register(req, res) {
  const { errors, isValid } = validateVerifyInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const mobile = req.body.mobile;
  const verify = req.body.verifyCode;

  try {
    let user = await userModel.findOne({ mobile, verifyCode: verify });

    if (!user) {
      errors.message = "کاربری با این شماره یافت نشد";
      return res.status(400).json(errors);
    }

    await user.save();

    const payload = {
      user: {
        id: user._id,
        mobile: user.mobile,
        role: user.role,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "5 days" },
      (err, token) => {
        if (err) throw err;
        res.json({ success: true, token, id: user._id });
      }
    );
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function login(req, res) {
  const { errors, isValid } = validateLogin(req.body);
  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const mobile = req.body.mobile;
  // Find usesr by mobile
  let user = await userModel.findOne({ mobile });
  // Check for user
  if (!user) {
    let code = Math.floor(Math.random() * (99999 - 10000 + 1) + 10000);
    api.VerifyLookup(
      {
        receptor: mobile,
        token: code,
        template: "ieltsAcademyVerify",
      },
      (response, status) => {
        console.log(response);
      }
    );
    let newUser = new userModel({
      mobile: mobile,
      verificationCode: code,
    });

    newUser.save((err) => {
      if (err) {
        return res.status(500).json("Internal Server Error");
      }
      return res.json({ success: true, message: "پیامک فعالسازی ارسال شد" });
    });
  } else {
    if (!user.active) {
      return res.json({
        message:
          "حساب کاربری شما مسدود می باشد. لطفا با مدیر سیستم تماس حاصل فرمایید",
        success: false,
      });
    }
    let code = Math.floor(Math.random() * (99999 - 10000 + 1) + 10000);
    console.log("code: " + code);
    api.VerifyLookup(
      {
        receptor: mobile,
        token: code,
        template: "ieltsAcademyVerify",
      },
      (response, status) => {
        console.log(response);
      }
    );

    user.verifyCode = code;
    await user.save();
    return res.json({ success: true, message: "پیامک فعالسازی ارسال شد" });
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

async function orderRequest(req, res) {
  const { gangTime, workingHours, list, firstName, lastName, email } = req.body;
  try {
    let user = await userModel.findOne(
      {
        $or: [{ email: req.body.email }],
      },
      (err, user) => {
        if (err) throw err;
        if (user) {
          res.status(400).json({ message: "Email is already." });
        } else {
          let generatedPassword = generatePassword.generate({
            length: 12,
            numbers: true,
          });

          let newUser = new userModel({
            firstName,
            lastName,
            email,
            password: generatedPassword,
          });

          newUser.save((err, user) => {
            if (err) throw err;
            const { errors, isValid } = orderValidator(req.body);
            if (!isValid) {
              return res.status(400).json(errors);
            }
            let makeID = require("../../lib/utilities").makeID;
            let newOrder = new orderModel({
              gangTime,
              workingHours,
              list,
              trackingNumber: makeID(10),
              user: user._id,
            });
            newOrder.save((err, order) => {
              if (err) throw err;
              userModel.findByIdAndUpdate(
                user._id,
                { $addToSet: { orders: [order._id] } },
                (err, result) => {
                  if (err) throw err;
                }
              );
              // Send an Email to Customer
              var transporter = nodemailer.createTransport({
                host: "smtp.mailtrap.io",
                port: 2525,
                auth: {
                  user: "ff09af08ba28bf",
                  pass: "556895c41fa49e",
                },
              });
              let info = transporter.sendMail({
                from: '"Kobold Company" <manvfx@gmail.com>', // Sender Address
                to: req.body.email, // List of Receivers
                subject: "Kobold - Order Information", // Subject Line
                text: "", // Plain Text Body
                html: `<p dir="rtl" style="text-align:right">Dear <strong>${req.body.firstName}</strong> <strong>${req.body.lastName}</strong> Welcome to the Kobold site</p>
              <p dir="rtl" style="text-align:right">Traking Number is <strong>${order.trackingNumber}</strong>.</p>
              <p dir="rtl" style="text-align:right">Email Address is <strong>${req.body.email}</strong> and password is <strong>${generatedPassword}</strong>login and finalize your order.</p>
              <p dir="rtl" style="text-align:right">Thanks</p>
              `, // HTML Body
              });
              console.log("Message Sent: %s", info.messageId);
              res.json({
                message: "Order susseccfully created",
                success: true,
                trackingNumber: order.trackingNumber,
              });
            });
          });
        }
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Internal Error" });
  }
}
