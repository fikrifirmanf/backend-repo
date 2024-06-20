import { Request, Response } from 'express';
import { db } from '../config/firebaseConfig';
import { ApiError } from '../entities/ApiError';
import { User } from '../entities/user.model'; // Import the User interface


export const updateUserData = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId; // Assuming you pass userId as a parameter
    const { ...userData } = req.body;

    await db.collection('USERS').doc(userId).update(userData);

    res.status(200).json({ message: 'User data updated successfully' });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: 'An error occurred while updating user data' });
  }
};

export const fetchUserData = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId; // Assuming you pass userId as a parameter

    const userDoc = await db.collection('USERS').doc(userId).get();

    if (!userDoc.exists) {
      throw new ApiError(404, 'User not found');
    }

    const userData = userDoc.data();

    res.status(200).json(userData);
  } catch (error) {
    if (error instanceof ApiError) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      console.error(error);
      res
        .status(500)
        .json({ error: 'An error occurred while fetching user data' });
    }
  }
};
export const addUser = async (req: Request, res: Response) => {
    try {
      const { username, name, password } = req.body; 

      // Validate required fields
      if (!username || !name || !password) {
        throw new ApiError(400, 'Username, name, and password are required');
      }

      // Check if username already exists
      const userDoc = await db.collection('USERS').where('username', '==', username).get();
      if (!userDoc.empty) {
        throw new ApiError(400, 'Username already exists');
      }

      // Create user object with timestamps
      const newUser: User = {
        username,
        name,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
      };

      // Add the new user to Firestore
      await db.collection('USERS').add(newUser);

      res.status(201).json({ message: 'User created successfully!' });

    } catch (error) {
      if (error instanceof ApiError) {
        res.status(error.statusCode).json({ error: error.message });
      } else {
        console.error(error);
        res.status(500).json({ error: 'Failed to create user' });
      }
    }
};