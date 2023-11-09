const express = require("express");
const Router = require("./routers/user");
const mongoose = require("mongoose");
const app = express();
const cors=require('cors');
const dotenv = require("dotenv").config();
app.use(cors());
app.use(express.json())
app.use("/api", Router);
const port = process.env.PORT || 5000;
const url = process.env.DATABASE_URL.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(url)
  .then(() => console.log(`Database is connected successfully 😃 😃`))
  .catch((err) => console.log(err));
app.listen(port, () => {
  console.log(`app is running on ${port}`);
});
