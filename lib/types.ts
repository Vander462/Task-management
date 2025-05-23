import { Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  username: string;
  email: string;
  password: string;
  createdAt: Date;
}

export interface ITask extends Document {
  title: string;
  description: string;
  dueDate: Date;
  status: 'Pending' | 'In Progress' | 'Completed';
  userId: string;
  createdAt: Date;
} 