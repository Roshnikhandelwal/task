const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

//SIGNUP
router.post("/signu[", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hash,
    });

    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if(!user)  res.status(400).json("Wrong credentials!");

    const validated = await bcrypt.compare(req.body.password, user.password);
    if(!validated) res.status(400).json("Wrong credentials!");
    let token
    if(validated){
        token = jwt.sign({
        username:user.username,
        usertype:user.usertype,
        email:user.email,
        phoner:user.phone
      },"this is token secret",
      {
          expiresIn:"24h"
      });
    }

    const { password, ...others } = user._doc;
    
    res.status(200).json({...others,token:token});
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
