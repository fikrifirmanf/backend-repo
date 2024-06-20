import express from 'express';
import { userRoutes } from '../routes/userRoutes';

const app = express();

app.use(express.json());

// Use your routes
app.use('/users', userRoutes);

// Default error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

export default app;