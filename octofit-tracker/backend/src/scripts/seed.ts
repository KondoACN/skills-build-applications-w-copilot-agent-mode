import { connectDatabase } from '../config/database';
import { ActivityModel } from '../models/Activity';
import { LeaderboardEntryModel } from '../models/LeaderboardEntry';
import { TeamModel } from '../models/Team';
import { UserModel } from '../models/User';
import { WorkoutModel } from '../models/Workout';

async function seedDatabase() {
  try {
    await connectDatabase();

    await Promise.all([
      UserModel.deleteMany({}),
      TeamModel.deleteMany({}),
      ActivityModel.deleteMany({}),
      WorkoutModel.deleteMany({}),
      LeaderboardEntryModel.deleteMany({}),
    ]);

    const teamDocs = await TeamModel.insertMany([
      { name: 'Aqua Striders', members: ['mia', 'leo'], points: 1250, focus: 'endurance' },
      { name: 'Solar Sprinters', members: ['ava', 'noah'], points: 1180, focus: 'speed' },
      { name: 'Mountain Movers', members: ['zoe'], points: 980, focus: 'strength' },
    ]);

    const teamIdByName = Object.fromEntries(teamDocs.map((team) => [team.name, team._id.toString()]));

    const userDocs = await UserModel.insertMany([
      { name: 'Mia Chen', email: 'mia@example.com', role: 'student', points: 420, teamId: teamIdByName['Aqua Striders'], streak: 7 },
      { name: 'Leo Martinez', email: 'leo@example.com', role: 'student', points: 390, teamId: teamIdByName['Aqua Striders'], streak: 5 },
      { name: 'Ava Brooks', email: 'ava@example.com', role: 'student', points: 455, teamId: teamIdByName['Solar Sprinters'], streak: 8 },
      { name: 'Noah Singh', email: 'noah@example.com', role: 'student', points: 300, teamId: teamIdByName['Solar Sprinters'], streak: 4 },
      { name: 'Zoe Patel', email: 'zoe@example.com', role: 'student', points: 365, teamId: teamIdByName['Mountain Movers'], streak: 6 },
      { name: 'Dr. Rivera', email: 'rivera@example.com', role: 'teacher', points: 150, teamId: null, streak: 2 },
    ]);

    const userIdByName = Object.fromEntries(userDocs.map((user) => [user.name, user._id.toString()]));

    await ActivityModel.insertMany([
      {
        userId: userIdByName['Mia Chen'],
        type: 'Run',
        durationMinutes: 32,
        caloriesBurned: 310,
        distanceKm: 5.2,
        date: new Date('2026-08-05T07:30:00.000Z'),
        note: 'Morning interval run',
      },
      {
        userId: userIdByName['Ava Brooks'],
        type: 'Cycling',
        durationMinutes: 45,
        caloriesBurned: 420,
        distanceKm: 14.1,
        date: new Date('2026-08-06T18:00:00.000Z'),
        note: 'Evening ride',
      },
      {
        userId: userIdByName['Zoe Patel'],
        type: 'Strength',
        durationMinutes: 40,
        caloriesBurned: 280,
        distanceKm: 0,
        date: new Date('2026-08-07T06:15:00.000Z'),
        note: 'Bodyweight circuit',
      },
    ]);

    await WorkoutModel.insertMany([
      {
        title: 'Tempo Run',
        category: 'Cardio',
        difficulty: 'Intermediate',
        durationMinutes: 30,
        description: 'Build speed with controlled bursts.',
        target: 'endurance',
      },
      {
        title: 'Core Flow',
        category: 'Mobility',
        difficulty: 'Beginner',
        durationMinutes: 20,
        description: 'Gentle mobility and core activation.',
        target: 'core',
      },
      {
        title: 'Power Lift',
        category: 'Strength',
        difficulty: 'Advanced',
        durationMinutes: 45,
        description: 'Compound lifting routine for explosive power.',
        target: 'full-body',
      },
    ]);

    await LeaderboardEntryModel.insertMany(
      userDocs.map((user) => ({
        userId: user._id.toString(),
        name: user.name,
        points: user.points,
        teamName: teamDocs.find((team) => team._id.toString() === user.teamId)?.name ?? 'Solo',
        streak: user.streak,
      })),
    );

    console.log('Database seeding complete');
    console.log(`Seeded ${teamDocs.length} teams, ${userDocs.length} users, 3 activities, 3 workouts, and ${userDocs.length} leaderboard entries`);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
