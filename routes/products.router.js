const {
  createProduct,
  deleteProduct,
  updateProduct,
  getAllProducts,
  getSingleProduct,
} = require("../controllers/products.controller");

const { verifyToken } = require("../middleware/verifyToken");

const { Router } = require("express");

const productRouter = Router();

productRouter.route("/").get(verifyToken, getAllProducts).post(createProduct);

productRouter
  .route("/:productId")
  .get(getSingleProduct)
  .patch(updateProduct)
  .delete(deleteProduct);

module.exports = productRouter;
