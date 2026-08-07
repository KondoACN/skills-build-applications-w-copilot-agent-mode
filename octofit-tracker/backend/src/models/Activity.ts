import mongoose, { Schema, type Document, type Model } from 'mongoose';

export interface IActivity extends Document {
  userId: string;
  type: string;
  durationMinutes: number;
  caloriesBurned: number;
  distanceKm: number;
  date: Date;
  note?: string;
}

const activitySchema = new Schema<IActivity>(
  {
    userId: { type: String, required: true },
    type: { type: String, required: true, trim: true },
    durationMinutes: { type: Number, default: 0 },
    caloriesBurned: { type: Number, default: 0 },
    distanceKm: { type: Number, default: 0 },
    date: { type: Date, default: Date.now },
    note: { type: String, trim: true },
  },
  { timestamps: true },
);

export const ActivityModel: Model<IActivity> = mongoose.model<IActivity>('Activity', activitySchema);
