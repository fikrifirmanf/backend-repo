import { Request, Response, NextFunction } from 'express';
import { admin } from '../config/firebaseConfig';

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const idToken = req.headers.authorization?.split(' ')[1];

    if (!idToken) {
      return res.status(401).json({ error: 'Unauthorized: Missing token' });
    }

    const decodedToken = await admin.auth().verifyIdToken(idToken);
    // You can access user information from decodedToken
    // Example: req.user = decodedToken;

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error('Authentication error:', error);
    return res.status(401).json({ error: 'Unauthorized' });
  }
};