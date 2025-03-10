require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Habit = require('../models/habit'); // Update the path

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

// Routes
app.get("/", async (req, res) => {
    try {
        res.json({
            How_Works: {
                base_url: "https://hc-habit-tracker.vercel.app/",
                endpoints: [
                    {
                        method: "POST",
                        path: "/",
                        description: "API documentation message",
                        response: {
                            message: "API documentation is available at the / directory",
                            tasks: "Array of tasks"
                        }
                    },
                    {
                        method: "POST",
                        path: "/habits",
                        description: "Create a new habit",
                        request_body: {
                            name: "string",
                            goal: "number",
                            completedDays: "array of dates",
                            reminder: "string (optional)"
                        },
                        response: {
                            _id: "string",
                            name: "string",
                            goal: "number",
                            completedDays: "array of dates",
                            reminder: "string"
                        }
                    },
                    {
                        method: "GET",
                        path: "/habits",
                        description: "Fetch all habits",
                        response: "Array of habit objects"
                    },
                    {
                        method: "PATCH",
                        path: "/habits/:id/complete",
                        description: "Mark a habit as completed for a specific date",
                        request_body: {
                            date: "string (YYYY-MM-DD)"
                        },
                        response: {
                            message: "Habit marked as completed",
                            habit: "Updated habit object"
                        }
                    },
                    {
                        method: "GET",
                        path: "/habits/progress",
                        description: "Get progress of all habits",
                        response: "Array of objects with habit progress details"
                    },
                    {
                        method: "POST",
                        path: "/habits/reminder",
                        description: "Set a reminder for a habit",
                        request_body: {
                            habitId: "string",
                            reminder: "string"
                        },
                        response: {
                            message: "Reminder set",
                            habit: "Updated habit object"
                        }
                    }
                ]
            },
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
app.post("/habits", async (req, res) => {
    try {
        const habit = new Habit(req.body);
        await habit.save();
        res.status(201).json(habit);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get("/habits", async (req, res) => {
    try {
        const habits = await Habit.find();
        res.json(habits);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
app.patch("/habits/:id/complete", async (req, res) => {
    try {
        const { id } = req.params;
        const { date } = req.body;
        const habit = await Habit.findById(id);

        if (!habit) return res.status(404).json({ error: "Habit not found" });

        habit.completedDays.push(date);
        await habit.save();
        res.json({ message: "Habit marked as completed", habit });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// Get habit progress
app.get("/habits/progress", async (req, res) => {
    try {
        const habits = await Habit.find();
        const progress = habits.map((habit) => ({
            name: habit.name,
            completedDays: habit.completedDays.length,
            goal: habit.goal,
        }));
        res.json(progress);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Set reminder for a habit
app.post("/habits/reminder", async (req, res) => {
    try {
        const { habitId, reminder } = req.body;
        const habit = await Habit.findById(habitId);

        if (!habit) return res.status(404).json({ error: "Habit not found" });

        habit.reminder = reminder;
        await habit.save();
        res.json({ message: "Reminder set", habit });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Export the app for Vercel
module.exports = app;
