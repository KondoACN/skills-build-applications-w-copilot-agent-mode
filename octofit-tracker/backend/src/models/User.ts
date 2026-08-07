import mongoose, { Schema, type Document, type Model } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  role: 'student' | 'teacher';
  points: number;
  teamId?: string | null;
  streak: number;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    role: { type: String, enum: ['student', 'teacher'], default: 'student' },
    points: { type: Number, default: 0 },
    teamId: { type: String, default: null },
    streak: { type: Number, default: 1 },
  },
  { timestamps: true },
);

export const UserModel: Model<IUser> = mongoose.model<IUser>('User', userSchema);
