import mongoose, { Schema, type Document, type Model } from 'mongoose';

export interface IWorkout extends Document {
  title: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  durationMinutes: number;
  description: string;
  target: string;
}

const workoutSchema = new Schema<IWorkout>(
  {
    title: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    difficulty: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], default: 'Beginner' },
    durationMinutes: { type: Number, default: 20 },
    description: { type: String, required: true, trim: true },
    target: { type: String, default: 'full-body' },
  },
  { timestamps: true },
);

export const WorkoutModel: Model<IWorkout> = mongoose.model<IWorkout>('Workout', workoutSchema);
