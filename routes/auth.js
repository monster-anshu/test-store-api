const express = require("express");
const res = require("express/lib/response");
const JWT = require("jsonwebtoken");
const fetchAdmin = require("../middleware/fetchAdmin");
const fetchUser = require("../middleware/fetchUser");
const Admin = require("../models/Admin");
const Products = require("../models/Products");
const User = require("../models/User");
const router = require("./product");
const JWT_SECRECT = "THIS_IS_SECRECT";

router.post("/admin/login", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).send({ err: "Something is missing" });

  try {
    const admin = await Admin.findOne({
      username: username,
      password: password,
    });
    if (!admin) {
      return res.status(401).send({ err: "Admin not found" });
    } else {
      const data = {
        admin: {
          id: admin.id,
        },
      };
      const authToken = await JWT.sign(data, JWT_SECRECT);
      return res.status(200).send({ authToken: authToken });
    }
  } catch (err) {
    res.send({ err: "Server down" }).status(500);
  }
});

router.post("/admin/getadmin", fetchAdmin, async (req, res) => {
  try {
    const adminId = req.admin.id;

    const admin = await Admin.findById(adminId).select("-password");

    if (admin === null) {
      return res.status(404).send({ err: "Admin not found" });
    }
    res.status(200).send(admin);
  } catch (err) {
    res.status(500).send({ err: "Server down" });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).send({ err: "Something is missing" });

  try {
    const user = await User.findOne({
      username: username,
      password: password,
    });
    if (!user) {
      return res.status(401).send({ err: "User not found" });
    } else {
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = await JWT.sign(data, JWT_SECRECT);
      return res.status(200).send({ authToken: authToken });
    }
  } catch (err) {
    res.send({ err: "Server down" }).status(500);
  }
});
router.post("/getuser", fetchUser, async (req, res) => {
  try {
    const userID = req.user.id;
    const user = await User.findById(userID).select("-password");

    if (user === null) {
      return res.status(404).send({ err: "Admin not found" });
    }
    res.status(200).send(user);
  } catch (err) {
    res.status(500).send({ err: "Server down" });
  }
});
module.exports = router;
