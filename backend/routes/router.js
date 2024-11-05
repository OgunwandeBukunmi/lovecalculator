const express = require("express");
const router = express.Router();
const app = express();
const jwt = require("jsonwebtoken");
const User = require("../models/nameSchema");
const mongoose = require("mongoose");
const Players = require("../models/playSchema");
require("dotenv").config();
app.use(express.json());

router.post("/register/:name", async (req, res) => {
  const { name } = req.params;
  console.log(req.url, req.method, req.hostname);

  try {
    const user = await User.create({ name });
    const payload = jwt.sign({ name }, process.env.SECRET_KEY, {
      expiresIn: 104_563_453_565467_4,
    });

    res.json({ user, payload });
  } catch (err) {
    console.log(err);
  }
});
router.post("/play/:Pranker", async (req, res) => {
  const { Pranker } = req.params;
  const Crusher = req.body.Crusher;
  const Crushee = req.body.Crushee;
  console.log({ Pranker, Crusher, Crushee });

  try {
    const play = await Players.create({ Pranker, Crusher, Crushee });
    res.json(play);
    console.log(play);
  } catch (err) {
    console.log(err);
  }
});
router.get("/d/:name", async (req, res) => {
  const { name } = req.params;
  try {
    const victims = await Players.find({ Pranker: name });
    if (!victims) res.json({ msg: "no victims found" });
    const ActualVictims = victims.reduce((accumulator, current) => {
      const CurrentCrusher = current.Crusher;
      const CurrentCrushee = current.Crushee;
      const UsefulCurrent = { CurrentCrusher, CurrentCrushee };
      accumulator = [...accumulator, UsefulCurrent];
      return accumulator;
    }, []);
    res.json(ActualVictims);
  } catch (err) {
    console.log(err);
  }
});
router.get("/verifypayload/:payload", async (req, res) => {
  const { payload } = req.params;

  try {
    const name = jwt.verify(payload, process.env.SECRET_KEY);
    if (!name) res.json({ msg: "No name found" });
    res.json(name);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
