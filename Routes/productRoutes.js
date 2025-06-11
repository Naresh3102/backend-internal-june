const express = require("express");
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../Controllers/productController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", createProduct);
router.get("/", protect, getAllProducts);
router.get("/:id", getProductById);
router.put("/:id", protect, updateProduct);
router.delete("/:id", protect, deleteProduct);

module.exports = router;
