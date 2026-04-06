import express from 'express';
const router = express.Router();
import { 
  authUser, 
  registerUser, 
  logoutUser, 
  getUserProfile 
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js'; // Import the guard

router.post('/', registerUser);
router.post('/login', authUser);
router.post('/logout', logoutUser);

// Use 'protect' here to ensure only logged-in users can see their profile
router.get('/profile', protect, getUserProfile);

export default router;