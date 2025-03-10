const mongoose = require('mongoose');

const habitSchema = new mongoose.Schema({
    name: String,
    description: String,
    goal: Number,
    completedDays: { type: [String], default: [] },
    reminder: Date,
    category: String,
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Habit", habitSchema);