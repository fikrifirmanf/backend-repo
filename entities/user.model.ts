// entities/user.model.ts
export interface User {
    username: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date | null; 
  }