import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import users from "./routes/user.js";
import dotenv from "dotenv";
import postRoutes from "./routes/post.js";

import cors from "cors";
const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server Running on Port: http://localhost:${PORT}`)
    )
  )
  .catch((error) => console.log(`${error} did not connect`));

mongoose.set("useFindAndModify", false);
app.get("/", function (req, res) {
  res.send("shree radhe");
});

app.use("/posts", postRoutes);
app.use("/user", users);
