const express = require("express");
const { dbConnect } = require("./config/dbConnect");
const productsRouter = require("./routes/products.router");

const app = express();

app.use(express.json());
app.use("/", productsRouter);

const start = async () => {
  await dbConnect();
};

app.listen(4000, () => {
  console.log("🚀Server Running");
});

start();
