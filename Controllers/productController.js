const Product = require("../models/Product.js");

// Create
const createProduct = async (req, res, next) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (err) {
    next(err);
  }
};

// Read All
const getAllProducts = async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 10,
      category,
      search,
      minPrice,
      maxPrice,
      minRating,
    } = req.query;

    const query = {};

    if (category) {
      query.category = category;
    }

    if (search && search.trim()) {
      query.title = { $regex: search, $options: "i" }; // case-insensitive
    }

    const total = await Product.countDocuments(query);

    const skipNumber = (page - 1) * limit;
    const limitNumber = parseInt(limit);

    const products = await Product.find(query)
      .skip(skipNumber)
      .limit(limitNumber);

    res.json({
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      products,
    });
  } catch (err) {
    next(err);
  }
};

// Read by ID
const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res.status(404).json({
        message: "Not found",
      });
    res.json(product);
  } catch (err) {
    next(err);
  }
};

// Update
const updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!product)
      return res.status(404).json({
        message: "Not found",
      });
    res.json(product);
  } catch (err) {
    next(err);
  }
};

// Delete
const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product)
      return res.status(404).json({
        message: "Not found",
      });
    res.json({ message: "Deleted successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
