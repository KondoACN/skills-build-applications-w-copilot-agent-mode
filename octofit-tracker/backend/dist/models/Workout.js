import mongoose, { Schema } from 'mongoose';
const workoutSchema = new Schema({
    title: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    difficulty: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], default: 'Beginner' },
    durationMinutes: { type: Number, default: 20 },
    description: { type: String, required: true, trim: true },
    target: { type: String, default: 'full-body' },
}, { timestamps: true });
export const WorkoutModel = mongoose.model('Workout', workoutSchema);
