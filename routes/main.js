const express = require("express");
const { ObjectId } = require("mongodb");
const userValidation = require("../validation/user");
const isLoggedIn = require("../middleware/isLoggedIn");
const mongo = require("../config/mongo");
const jwt = require("jsonwebtoken");
const router = express.Router();

router.get("/users", isLoggedIn, async (req, res) => {
  try {
    const users = await mongo.db("test").collection("users").find({}).toArray();
    res.send(users);
  } catch {
    res.status(500).json({ error: "Something went wrong" });
  }
});

router.put("/profile", isLoggedIn, async (req, res) => {
  try {
    await mongo
      .db("test")
      .collection("users")
      .updateOne({ _id: ObjectId(req.user.id) }, { $set: req.body });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

router.post("/login", (req, res) => {
  if (!req.body?.email)
    res.status(400).json({ error: "Invalid email or password!" });

  const users = mongo.db("test").collection("users");

  users.findOne({ email: req.body?.email }, "password", (err, data) => {
    if (err) res.status(500).json({ error: "Something went wrong" });
    if (data?.password == req.body?.password)
      return res.json({ error: "Invalid email or password!" });
    else {
      const token = jwt.sign({ id: data._id }, process.env.JWT_KEY);
      res.json({ token });
    }
  });
});

router.post("/signup", (req, res) => {
  const { error, value } = userValidation.validate(req.body);
  if (error) return res.json({ error: error.details[0].message });

  const users = mongo.db("test").collection("users");

  users.findOne({ email: value.email }, (err, data) => {
    if (data) return res.json({ error: "User already exists!" });
    users.insertOne(value, (err, data) => {
      if (err) res.status(400).json({ error: "Something went wrong" });
      else {
        const token = jwt.sign({ id: data._id }, process.env.JWT_KEY);
        res.json({ token });
      }
    });
  });
});

module.exports = router;
