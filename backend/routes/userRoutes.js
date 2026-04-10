import express from 'express';
const router = express.Router();
import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
} from '../controllers/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

// Base Route: /api/users
router.route('/')
  .post(registerUser)           // Public: Register
  .get(protect, admin, getUsers); // Admin: View all users

// Auth & Logout
router.post('/auth', authUser);
router.post('/logout', logoutUser);

// User Profile (Private)
router.route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

// Admin-Only Operations: /api/users/:id
router.route('/:id')
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser);

export default router;