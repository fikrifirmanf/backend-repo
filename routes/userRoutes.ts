import express from 'express';
import { updateUserData, fetchUserData, addUser } from '../controller/api';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

// Apply authMiddleware to all routes in this file if needed
// router.use(authMiddleware);

router.put('/:userId', authMiddleware, updateUserData);
router.get('/:userId', authMiddleware, fetchUserData);
router.post('/', authMiddleware, addUser);

export const userRoutes = router;