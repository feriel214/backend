const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

//Creation compte ===> Register
router.post("/register", async (req, res) => {
  try {
    //cryptage de mopt de passe
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    //creation un modele de user avec les donnes recus du requette
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPass,
    });
    //enregistrement de user dans MongoDB
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});
//Login
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    !user && res.status(400).json(" username incorrectes");
    const validated = await bcrypt.compare(req.body.password, user.password);
    !validated && res.status(400).json("Mot de passe incorrect");

    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    console.log(err);
  }
});
module.exports = router;
