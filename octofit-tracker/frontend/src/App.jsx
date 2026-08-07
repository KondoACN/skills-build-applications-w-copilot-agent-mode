import { useEffect, useState } from 'react';
import './App.css';
import { fetchJson } from './api';

function App() {
  const [users, setUsers] = useState([]);
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadData() {
      try {
        const [usersData, activitiesData] = await Promise.all([
          fetchJson('/api/users'),
          fetchJson('/api/activities'),
        ]);
        setUsers(usersData);
        setActivities(activitiesData);
      } catch (err) {
        setError(err.message);
      }
    }

    loadData();
  }, []);

  return (
    <main className="container py-5">
      <section className="row align-items-center g-4">
        <div className="col-lg-7">
          <p className="text-uppercase fw-semibold text-primary">OctoFit Tracker</p>
          <h1 className="display-4 fw-bold">Modern fitness tracking for teams and individuals</h1>
          <p className="lead text-muted mt-3">
            Log workouts, build friendly competition, and keep your health goals visible with a polished multi-tier experience.
          </p>
          <div className="d-flex gap-3 mt-4">
            <a className="btn btn-primary btn-lg" href="#">Start tracking</a>
            <a className="btn btn-outline-secondary btn-lg" href="#">View leaderboard</a>
          </div>
        </div>
        <div className="col-lg-5">
          <div className="card shadow-sm border-0">
            <div className="card-body p-4">
              <h2 className="h4 fw-bold">Ready for launch</h2>
              <ul className="list-group list-group-flush mt-3">
                <li className="list-group-item px-0">React 19 + Vite frontend</li>
                <li className="list-group-item px-0">Express + TypeScript backend</li>
                <li className="list-group-item px-0">MongoDB-ready data layer</li>
              </ul>
              {error ? <p className="text-danger mt-3">{error}</p> : null}
              <div className="mt-3">
                <p className="fw-semibold mb-2">Users: {users.length}</p>
                <p className="fw-semibold mb-0">Activities: {activities.length}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default App
