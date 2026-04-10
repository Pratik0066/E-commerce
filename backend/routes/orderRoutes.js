import express from 'express';
const router = express.Router();
import {
  addOrderItems,
  getMyOrders,
  getOrderById,
  verifyPayment,
  updateOrderToDelivered,
  getOrders,
} from '../controllers/orderController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

// /api/orders
router.route('/')
  .post(protect, addOrderItems) // User: Place an order
  .get(protect, admin, getOrders); // Admin: Get all orders

// /api/orders/myorders
router.route('/myorders').get(protect, getMyOrders); // User: See my past orders

// /api/orders/:id
router.route('/:id').get(protect, getOrderById); // User/Admin: See specific order details

// /api/orders/:id/pay
router.route('/:id/pay').put(protect,  verifyPayment); // User: Mark as paid via Razorpay

// /api/orders/:id/deliver
router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered); // Admin: Mark as shipped
router.route('/:id/verify').post(protect, verifyPayment);

export default router;