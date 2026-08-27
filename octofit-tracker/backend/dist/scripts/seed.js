import mongoose from 'mongoose';
import { connectDatabase } from '../config/database.js';
import { Activity, Leaderboard, Team, User, Workout } from '../models.js';
async function seedDatabase() {
    try {
        // Seed the octofit_db database with test data.
        await connectDatabase();
        await Promise.all([
            Activity.deleteMany({}),
            Leaderboard.deleteMany({}),
            Team.deleteMany({}),
            User.deleteMany({}),
            Workout.deleteMany({}),
        ]);
        const users = await User.create([
            { username: 'maya.chen', email: 'maya.chen@example.com', displayName: 'Maya Chen' },
            { username: 'liam.roberts', email: 'liam.roberts@example.com', displayName: 'Liam Roberts' },
            { username: 'sofia.martin', email: 'sofia.martin@example.com', displayName: 'Sofia Martin' },
        ]);
        const teams = await Team.create([
            { name: 'Summit Striders', description: 'A steady team focused on endurance.', memberIds: [users[0]._id, users[1]._id] },
            { name: 'Power Circuit', description: 'Strength and consistency, every week.', memberIds: [users[2]._id] },
        ]);
        await User.findByIdAndUpdate(users[0]._id, { teamId: teams[0]._id });
        await User.findByIdAndUpdate(users[1]._id, { teamId: teams[0]._id });
        await User.findByIdAndUpdate(users[2]._id, { teamId: teams[1]._id });
        await Activity.create([
            { userId: users[0]._id, type: 'running', durationMinutes: 32, distanceKm: 5.1, points: 51, performedAt: new Date('2026-08-24') },
            { userId: users[1]._id, type: 'walking', durationMinutes: 45, distanceKm: 3.8, points: 38, performedAt: new Date('2026-08-25') },
            { userId: users[2]._id, type: 'strength', durationMinutes: 30, points: 45, performedAt: new Date('2026-08-26') },
        ]);
        await Leaderboard.create([
            { userId: users[0]._id, points: 420, rank: 1 },
            { userId: users[2]._id, points: 385, rank: 2 },
            { userId: users[1]._id, points: 310, rank: 3 },
        ]);
        await Workout.create([
            { title: 'Starter Run', description: 'An easy-paced run with a gentle warmup and cooldown.', difficulty: 'beginner', durationMinutes: 25, targetActivity: 'running' },
            { title: 'Full Body Foundations', description: 'A balanced strength session using bodyweight movements.', difficulty: 'intermediate', durationMinutes: 30, targetActivity: 'strength' },
            { title: 'Long Walk Reset', description: 'A relaxed walk designed to build a consistent daily habit.', difficulty: 'beginner', durationMinutes: 40, targetActivity: 'walking' },
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
