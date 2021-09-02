const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongo = require("mongoose");

dotenv.config();

mongo
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB Connection Successful!"))
  .catch((err) => console.log(err));

app.listen(8080, () => {
  console.log("Backend server is running!");
});
