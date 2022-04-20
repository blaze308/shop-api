const {
  createProduct,
  deleteProduct,
  updateProduct,
  getAllProducts,
  getSingleProduct,
} = require("../controllers/products.controller");

const { Router } = require("express");

const productRouter = Router();

productRouter.route("/").get(getAllProducts).post(createProduct);

productRouter
  .route("/:productId")
  .get(getSingleProduct)
  .patch(updateProduct)
  .delete(deleteProduct);

module.exports = productRouter;
