const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const categoryRoutes = require("./routes/categories");
const postRoutes = require("./routes/post");
dotenv.config(); //pour acceder au variables dans .env
app.use(express.json());
//la connexionn avec mongo db
mongoose
  .connect(process.env.MONGO_URL, { useNewUrlParser: true })
  .then(() => {
    console.log("Connexion bien établie avec MongoDB ");
  })
  .catch((err) => {
    console.log("Probleme de connexion avec Mongo DB !" + err);
  });
app.use("/api/auth", authRoute);
app.use("/api/categories", categoryRoutes);
app.use("/api/posts", postRoutes);

//le serveur en écoute
app.listen("8000", () => {
  console.log("Server is listening on PORT 5000");
});
