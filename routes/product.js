const express = require("express");
const fetchAdmin = require("../middleware/fetchAdmin");
const fetchUser = require("../middleware/fetchUser");
const Products = require("../models/Products");
const router = express.Router();

router.post("/", fetchAdmin, async (req, res) => {
  const { productName, productPrice, productID } = req.body;

  if (!productName || !productPrice || !productID)
    return res.status(400).send({ err: "Something is missing" });
  const item = await Products.findOne({ productID: productID });

  if (item) {
    return res.status(400).send({ err: "Product ID already exist" });
  }

  try {
    await Products.create(
      {
        productName: productName,
        productPrice: productPrice,
        productID: productID,
      },
      () => {
        res.status(200).send({ msg: "Product Added" });
      }
    );
  } catch (err) {
    res.status(500).send({ err: "Server down" });
  }
});

router.delete("/:id", fetchAdmin, async (req, res) => {
  const ID = req.params.id;
  try {
    const Product = await Products.findOne({
      productID: ID,
    });
    if (!Product)
      return res.status(404).send({
        err: "Product Not found !",
      });

    await Products.findOneAndDelete({
      productID: ID,
    });
    res.status(200).send({ msg: "Product Deleted" });
  } catch (err) {
    res.status(500).send({ err: "Server down" });
  }
});
router.delete("/id/:id", fetchAdmin, async (req, res) => {
  const ID = req.params.id;
  try {
    const Product = await Products.findById(ID);
    if (!Product)
      return res.status(404).send({
        err: "Product Not found !",
      });

    await Products.findByIdAndDelete(ID);
    res.status(200).send({ msg: "Product Deleted" });
  } catch (err) {
    res.status(404).send({
      err: "Product ID is not Valid !",
    });
  }
});

router.put("/id/:id", fetchAdmin, async (req, res) => {
  const ID = req.params.id;
  try {
    const { productName, productPrice, productID } = req.body;
    const newProduct = {};

    if (productName) {
      newProduct.productName = productName;
    }
    if (productPrice) {
      newProduct.productPrice = productPrice;
    }
    if (productID) {
      newProduct.productID = productID;
    }

    const Product = await Products.findByIdAndUpdate(ID);
    if (!Product) return res.status(404).send({ err: "Product Not found !" });
    await Products.findByIdAndUpdate(ID, { $set: newProduct }, { new: true });
    res.status(200).send({ msg: "Product Updated" });
  } catch (err) {
    res.status(500).send({ err: "Server down" });
  }
});
router.put("/:id", fetchAdmin, async (req, res) => {
  const ID = req.params.id;
  try {
    const { productName, productPrice, productID } = req.body;
    const newProduct = {};

    if (productName) {
      newProduct.productName = productName;
    }
    if (productPrice) {
      newProduct.productPrice = productPrice;
    }
    if (productID) {
      newProduct.productID = productID;
    }

    const Product = await Products.findOne({ productID: ID });
    if (!Product) return res.status(404).send({ err: "Product Not found !" });
    await Products.findOneAndUpdate(
      { productID: ID },
      { $set: newProduct },
      { new: true }
    );
    res.status(200).send({ msg: "Product Updated" });
  } catch (err) {
    res.status(500).send({ err: "Server down" });
  }
});

router.get("/admin/", fetchAdmin, async (req, res) => {
  try {
    const Product = await Products.find().select("-__v");
    res.status(200).send(Product);
  } catch (error) {
    res.status(500).send({ err: "Server down" });
  }
});
router.get("/admin/:id", fetchAdmin, async (req, res) => {
  const ID = req.params.id;
  try {
    const Product = await Products.find({ productID: ID }).select("-__v");
    res.status(200).send(Product);
  } catch (error) {
    res.status(500).send({ err: "Server down" });
  }
});

router.get("/", fetchUser, async (req, res) => {
  try {
    const Product = await Products.find().select("-__v");
    res.status(200).send(Product);
  } catch (error) {
    res.status(500).send({ err: "Server down" });
  }
});



router.get("/:id", fetchUser, async (req, res) => {
  const ID = req.params.id;
  try {
    const Product = await Products.find({ productID: ID }).select("-__v");
    res.status(200).send(Product);
  } catch (error) {
    res.status(500).send({ err: "Server down" });
  }
});



module.exports = router;
