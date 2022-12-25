const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const categoryRoutes = require("./routes/categories");
const postRoutes = require("./routes/post");
const usersRoutes = require("./routes/users");
const multer = require("multer");
const path = require("path");
dotenv.config(); //pour acceder au variables dans .env
app.use(express.json());
//pour que le client puisse accede aux imapges ===> MPATH
app.use("/images", express.static(path.join(__dirname, "/images")));
//la connexionn avec mongo db
mongoose
  .connect(process.env.MONGO_URL, { useNewUrlParser: true })
  .then(() => {
    console.log("Connexion bien établie avec MongoDB ");
  })
  .catch((err) => {
    console.log("Probleme de connexion avec Mongo DB !" + err);
  });
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});
const upload = multer({ storage: storage });
//api pou uploader les images
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("image has been uploaded !! ");
});
app.use("/api/auth", authRoute);
app.use("/api/categories", categoryRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/users", usersRoutes);

//le serveur en écoute
app.listen("5000", () => {
  console.log("Server is listening on PORT 5000");
});
