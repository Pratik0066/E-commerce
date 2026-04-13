import express from 'express';
const router = express.Router();
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
} from '../controllers/productController.js';
import Product from '../models/Product.js';
import { protect, admin } from '../middleware/authMiddleware.js'; // <-- add this line


// @desc    Fetch all products
// @route   GET /api/products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Server Error: Could not fetch products' });
    }
});

// @desc    Fetch single product by ID
// @route   GET /api/products/:id
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Invalid Product ID' });
    }
});
// The route for /api/products
router.route('/')
  .get(getProducts)
  .post(protect, admin, createProduct); 

router.route('/:id')
.get(getProductById)
.put(protect, admin, updateProduct)
.delete(protect, admin, deleteProduct);

router.route('/:id/reviews')
.post(protect, createProductReview);


import { getChatResponse } from '../controllers/productController.js';
router.post('/chat', getChatResponse);


export default router;