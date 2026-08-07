import mongoose from 'mongoose';
import { connectDatabase } from '../config/database';
import { ActivityModel } from '../models/Activity';
import { LeaderboardEntryModel } from '../models/LeaderboardEntry';
import { TeamModel } from '../models/Team';
import { UserModel } from '../models/User';
import { WorkoutModel } from '../models/Workout';
/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
    try {
        await connectDatabase();
        await Promise.all([
            UserModel.deleteMany({}),
            TeamModel.deleteMany({}),
            ActivityModel.deleteMany({}),
            LeaderboardEntryModel.deleteMany({}),
            WorkoutModel.deleteMany({}),
        ]);
        const teams = await TeamModel.create([
            { name: 'River Runners', members: [], points: 180, focus: 'endurance' },
            { name: 'Peak Pioneers', members: [], points: 210, focus: 'strength' },
        ]);
        const users = await UserModel.create([
            {
                name: 'Maya Chen',
                email: 'maya.chen@example.com',
                role: 'student',
                points: 125,
                teamId: teams[0]._id.toString(),
                streak: 5,
            },
            {
                name: 'Jordan Alvarez',
                email: 'jordan.alvarez@example.com',
                role: 'student',
                points: 160,
                teamId: teams[1]._id.toString(),
                streak: 7,
            },
            {
                name: 'Riley Brooks',
                email: 'riley.brooks@example.com',
                role: 'teacher',
                points: 95,
                teamId: null,
                streak: 3,
            },
        ]);
        await ActivityModel.create([
            {
                userId: users[0]._id.toString(),
                type: 'Run',
                durationMinutes: 35,
                caloriesBurned: 420,
                distanceKm: 5.2,
                date: new Date('2026-08-05T07:30:00.000Z'),
                note: 'Morning jog along the river',
            },
            {
                userId: users[1]._id.toString(),
                type: 'Strength',
                durationMinutes: 45,
                caloriesBurned: 510,
                distanceKm: 0,
                date: new Date('2026-08-06T18:15:00.000Z'),
                note: 'Upper body circuit',
            },
            {
                userId: users[2]._id.toString(),
                type: 'Yoga',
                durationMinutes: 30,
                caloriesBurned: 180,
                distanceKm: 0,
                date: new Date('2026-08-07T06:00:00.000Z'),
                note: 'Mobility flow',
            },
        ]);
        await LeaderboardEntryModel.create([
            {
                userId: users[0]._id.toString(),
                name: users[0].name,
                points: users[0].points,
                teamName: 'River Runners',
                streak: users[0].streak,
            },
            {
                userId: users[1]._id.toString(),
                name: users[1].name,
                points: users[1].points,
                teamName: 'Peak Pioneers',
                streak: users[1].streak,
            },
            {
                userId: users[2]._id.toString(),
                name: users[2].name,
                points: users[2].points,
                teamName: 'Solo',
                streak: users[2].streak,
            },
        ]);
        await WorkoutModel.create([
            {
                title: 'River Run Intervals',
                category: 'Cardio',
                difficulty: 'Intermediate',
                durationMinutes: 28,
                description: 'Alternate sprint and recovery segments for steady endurance.',
                target: 'cardio',
            },
            {
                title: 'Core Strength Flow',
                category: 'Strength',
                difficulty: 'Beginner',
                durationMinutes: 20,
                description: 'A short circuit focused on posture and balance.',
                target: 'core',
            },
            {
                title: 'Sunrise Mobility',
                category: 'Recovery',
                difficulty: 'Beginner',
                durationMinutes: 15,
                description: 'Gentle mobility and breathing for a fresh start.',
                target: 'mobility',
            },
        ]);
        console.log('Database seeding complete');
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
    finally {
        await mongoose.disconnect();
    }
}
seedDatabase();
