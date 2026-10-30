// ============================================================
// app.js  —  Express Application setup
// Practical 12: CI/CD Pipeline with GitHub Actions
// Student: Smitrajsinh Zala | ID: 24IT113 | B.Tech IT | CHARUSAT
// ============================================================

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(cors());
app.use(express.json());

// Serve the interactive submission portal from 'public'
app.use(express.static(path.join(__dirname, 'public')));

// In-memory data store for Task Management API
let tasks = [
  {
    id: 1,
    title: 'Configure GitHub Actions CI Runner',
    description: 'Automated workflow on push to main branch with ubuntu-latest runner.',
    completed: true,
    priority: 'high'
  },
  {
    id: 2,
    title: 'Execute Jest & Supertest Integration Suite',
    description: 'Verify HTTP status codes, request payloads, and schema validation.',
    completed: false,
    priority: 'medium'
  },
  {
    id: 3,
    title: 'Validate Branch Protection & Status Badges',
    description: 'Ensure automated build status reflects passing badge in README.',
    completed: false,
    priority: 'low'
  }
];

// GET /tasks — Fetch all tasks
app.get('/tasks', (req, res) => {
  res.status(200).json({
    success: true,
    count: tasks.length,
    data: tasks
  });
});

// GET /tasks/:id — Fetch task by ID
app.get('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id, 10);
  const task = tasks.find(t => t.id === taskId);

  if (!task) {
    return res.status(404).json({
      success: false,
      message: `Task with ID ${taskId} not found`
    });
  }

  res.status(200).json({
    success: true,
    data: task
  });
});

// POST /tasks — Create a new task with validation
app.post('/tasks', (req, res) => {
  const { title, description, priority } = req.body;

  if (!title || title.trim() === '') {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: {
        title: 'Title is required'
      }
    });
  }

  const allowedPriorities = ['low', 'medium', 'high'];
  if (priority && !allowedPriorities.includes(priority.toLowerCase())) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: {
        priority: 'Priority must be low, medium, or high'
      }
    });
  }

  const newTask = {
    id: tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1,
    title: title.trim(),
    description: description || '',
    completed: false,
    priority: priority ? priority.toLowerCase() : 'medium'
  };

  tasks.unshift(newTask);

  res.status(201).json({
    success: true,
    message: 'Task created successfully',
    data: newTask
  });
});

// DELETE /tasks/:id
app.delete('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id, 10);
  const index = tasks.findIndex(t => t.id === taskId);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: `Task with ID ${taskId} not found`
    });
  }

  const deleted = tasks.splice(index, 1)[0];
  res.status(200).json({
    success: true,
    message: 'Task deleted successfully',
    data: deleted
  });
});

module.exports = app;
