const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const app = express();
const router = require("./routes/router.js");

app.use(express.json());

const cors = require("cors");

app.use(
  cors({
    origin: "*",
  })
);
app.use("/", router);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(process.env.PORT, () =>
      console.log(`Databse connected and listening on port ${process.env.Port}`)
    );
  })
  .catch((err) => {
    console.log(err);
  });
