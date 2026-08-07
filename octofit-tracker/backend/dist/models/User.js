import mongoose, { Schema } from 'mongoose';
const userSchema = new Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    role: { type: String, enum: ['student', 'teacher'], default: 'student' },
    points: { type: Number, default: 0 },
    teamId: { type: String, default: null },
    streak: { type: Number, default: 1 },
}, { timestamps: true });
export const UserModel = mongoose.model('User', userSchema);
