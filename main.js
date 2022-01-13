// This Project is developed By Himanshu Gunwant https://github.com/monster-anshu
const ProjectURI = "https://github.com/monster-anshu";
require("dotenv").config();
const express = require("express");
const connectToMongo = require("./DB/DB");
const app = express();
const PORT = process.env.PORT || 5000;
connectToMongo();
app.use(express.json());
app.use("/api/product", require("./routes/product"));
app.use("/api/auth/", require("./routes/auth"));
app.get("/", (req, res) => {
  res.send(
    `<h1>For more information of this api go to ${ProjectURI}  or <a href=${ProjectURI} target=_"blank" >Click Here</a></h1>`
  );
});
app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
