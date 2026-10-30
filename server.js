// ============================================================
// server.js  —  Server Entrypoint
// Practical 12: CI/CD Pipeline with GitHub Actions
// Course: ITUE301 — Advanced Web Development Frameworks
// Student: Smitrajsinh Zala | ID: 24IT113 | B.Tech IT | CHARUSAT
// ============================================================

const app = require('./app');
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`============================================================`);
  console.log(`🚀 ITUE301 Practical 12 API running at http://localhost:${PORT}`);
  console.log(`Student: Smitrajsinh Zala (24IT113)`);
  console.log(`CI/CD: GitHub Actions Enabled`);
  console.log(`============================================================`);
});
