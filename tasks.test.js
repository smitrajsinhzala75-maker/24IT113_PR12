// ============================================================
// tests/tasks.test.js  —  Automated Jest & Supertest Suite
// Practical 12: CI/CD Pipeline with GitHub Actions
// Student: Smitrajsinh Zala | ID: 24IT113 | B.Tech IT | CHARUSAT
// ============================================================

const request = require('supertest');
const app = require('../app');

describe('Task Management API — Automated CI Test Suite', () => {

  // Test 1: GET /tasks endpoint returns status 200 (Core Lab Requirement)
  test('GET /tasks returns 200 and array of tasks', async () => {
    const res = await request(app).get('/tasks');
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  // Test 2: GET /tasks/:id returns 200 for existing task
  test('GET /tasks/1 returns 200 with matching task details', async () => {
    const res = await request(app).get('/tasks/1');
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.id).toBe(1);
  });

  // Test 3: GET /tasks/:id returns 404 for non-existent task
  test('GET /tasks/9999 returns 404 with error message', async () => {
    const res = await request(app).get('/tasks/9999');
    expect(res.statusCode).toBe(404);
    expect(res.body.success).toBe(false);
  });

  // Test 4: POST /tasks creates a new task and returns 201
  test('POST /tasks with valid data returns 201 Created', async () => {
    const newTask = {
      title: 'Automated CI Test Task',
      description: 'Verified by GitHub Actions runner',
      priority: 'high'
    };

    const res = await request(app)
      .post('/tasks')
      .send(newTask);

    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.title).toBe('Automated CI Test Task');
  });

  // Test 5: POST /tasks rejects empty title with 400 Validation Error
  test('POST /tasks with empty title returns 400 Validation Error', async () => {
    const invalidTask = {
      title: '',
      description: 'Missing title test'
    };

    const res = await request(app)
      .post('/tasks')
      .send(invalidTask);

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.errors.title).toBe('Title is required');
  });

});
