const express = require("express");
const server = express();
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const port = process.env.PORT;

// ===================================================

server.use(cors());
server.use(bodyParser.json());

// ===================================================

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/Name");
  console.log("MongoDb Connect Successfully");
}

// this is schema

const User = new mongoose.Schema({
  username: String,
  password: String,
});

const Users = mongoose.model("CURD", User);

// ===================================================

server.post("/demo", async (req, res) => {
  try {
    const user = new Users(req.body);
    await user.save().then((doc) => {
      res.status(201).json(doc);
    });
  } catch (error) {
    res.status(400).json(error);
  }
});

// ===================================================

server.get("/demo", async (req, res) => {
  try {
    await Users.find({}).then((doc) => {
      res.status(200).json(doc);
    });
  } catch (error) {
    res.status(200).json(error);
  }
});

// ===================================================

server.listen(port, () => {
  console.log("server is listening ");
});
