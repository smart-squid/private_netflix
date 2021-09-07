const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongo = require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const movieRoute = require("./routes/movies");
const listRoute = require("./routes/lists");
const statRoute = require("./routes/stats");

dotenv.config();

mongo
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log("DB Connection Successful!"))
    .catch((err) => console.log(err));

app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/movies", movieRoute);
app.use("/api/lists", listRoute);
app.use("/api/stats", statRoute);

app.listen(8080, () => {
    console.log("Backend server is running!");
});
