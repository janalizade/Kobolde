const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const http = require("http");
const figlet = require("figlet");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const errorHandler = require("../app/http/middlewares/error-handler");

module.exports = class Application {
  constructor() {
    this.setupExpress();
    this.setMongoConnection();
    this.setConfig();
    this.setRouters();
  }

  setupExpress() {
    const server = http.createServer(app);
    server.listen(config.port, () =>
      console.log(`Server running on port ${config.port}`)
    );
  }

  setMongoConnection() {
    mongoose.Promise = global.Promise;
    mongoose
      .set("useCreateIndex", true)
      .connect(config.database.url, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useNewUrlParser: true,
      })
      .then(() => console.log("MongoDB Connected..."))
      .catch(() =>
        console.error(colors.red("Could not connect to MongoDB..."))
      );
  }

  setConfig() {
    // Body parser middleware
  //  app.use(fileUpload({ createParentPath: true }));
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json({ type: "application/json" }));
    app.use("/public", express.static("public"));
    app.use(cors());
    app.use(errorHandler);

    figlet("Server", function (err, data) {
      if (err) {
        console.log("Something went wrong...");
        console.dir(err);
        return;
      }
      console.log(data);
    });
  }

  setRouters() {
    const apiRouter = require("./routes/api/v1");
    const webRouter = require("./routes/web");
    // use routes
    app.use("/api/v1", apiRouter);
    app.use("/", webRouter);
  }
};
