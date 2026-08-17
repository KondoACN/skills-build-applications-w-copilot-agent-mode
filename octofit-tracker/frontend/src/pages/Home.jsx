import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchJson } from '../api';

export default function Home() {
  const [users, setUsers] = useState([]);
  const [activities, setActivities] = useState([]);
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const [usersData, activitiesData, teamsData] = await Promise.all([
          fetchJson('/api/users').catch(() => []),
          fetchJson('/api/activities').catch(() => []),
          fetchJson('/api/teams').catch(() => []),
        ]);

        // Handle both array and paginated responses
        setUsers(Array.isArray(usersData) ? usersData : usersData.data || usersData.users || []);
        setActivities(Array.isArray(activitiesData) ? activitiesData : activitiesData.data || activitiesData.activities || []);
        setTeams(Array.isArray(teamsData) ? teamsData : teamsData.data || teamsData.teams || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  return (
    <main className="flex-grow-1">
      {/* Hero Section */}
      <section className="bg-gradient py-5" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
        <div className="container py-5">
          <div className="row align-items-center g-4">
            <div className="col-lg-7">
              <p className="text-uppercase fw-semibold text-white opacity-75">OctoFit Tracker</p>
              <h1 className="display-4 fw-bold text-white">Modern fitness tracking for teams and individuals</h1>
              <p className="lead text-white opacity-90 mt-3">
                Log workouts, build friendly competition, and keep your health goals visible with a polished multi-tier experience.
              </p>
              <div className="d-flex gap-3 mt-4">
                <Link className="btn btn-light btn-lg fw-semibold" to="/users">Start tracking</Link>
                <Link className="btn btn-outline-light btn-lg fw-semibold" to="/leaderboard">View leaderboard</Link>
              </div>
            </div>
            <div className="col-lg-5">
              <div className="card shadow-lg border-0">
                <div className="card-body p-4">
                  <h2 className="h4 fw-bold mb-3">✨ Ready for launch</h2>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item px-0 py-2">
                      <span className="me-2">⚛️</span> React 19 + Vite frontend
                    </li>
                    <li className="list-group-item px-0 py-2">
                      <span className="me-2">🚀</span> Express + TypeScript backend
                    </li>
                    <li className="list-group-item px-0 py-2">
                      <span className="me-2">🗄️</span> MongoDB data layer
                    </li>
                  </ul>
                  {error && <p className="text-danger mt-3 mb-0 small">{error}</p>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      {!loading && (
        <section className="py-5 bg-light">
          <div className="container">
            <div className="row text-center mb-4">
              <div className="col">
                <h2 className="h3 fw-bold">Platform Overview</h2>
              </div>
            </div>
            <div className="row g-4">
              <div className="col-md-3">
                <div className="card border-0 shadow-sm text-center h-100">
                  <div className="card-body p-4">
                    <h3 className="display-5 fw-bold text-primary">{users.length}</h3>
                    <p className="text-muted mb-0">
                      <Link to="/users" className="text-decoration-none">Active Users</Link>
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card border-0 shadow-sm text-center h-100">
                  <div className="card-body p-4">
                    <h3 className="display-5 fw-bold text-success">{activities.length}</h3>
                    <p className="text-muted mb-0">
                      <Link to="/activities" className="text-decoration-none">Activities Logged</Link>
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card border-0 shadow-sm text-center h-100">
                  <div className="card-body p-4">
                    <h3 className="display-5 fw-bold text-warning">{teams.length}</h3>
                    <p className="text-muted mb-0">
                      <Link to="/teams" className="text-decoration-none">Teams</Link>
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card border-0 shadow-sm text-center h-100">
                  <div className="card-body p-4">
                    <h3 className="display-5 fw-bold text-danger">🏆</h3>
                    <p className="text-muted mb-0">
                      <Link to="/leaderboard" className="text-decoration-none">Leaderboard</Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Features Section */}
      <section className="py-5">
        <div className="container">
          <div className="row text-center mb-5">
            <div className="col">
              <h2 className="h3 fw-bold">Key Features</h2>
              <p className="text-muted">Everything you need to manage your fitness community</p>
            </div>
          </div>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card border-0 h-100">
                <div className="card-body">
                  <div className="display-6 mb-3">👥</div>
                  <h5 className="card-title">User Profiles</h5>
                  <p className="card-text text-muted">
                    Create and manage user profiles with roles and tracking data.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card border-0 h-100">
                <div className="card-body">
                  <div className="display-6 mb-3">🏃</div>
                  <h5 className="card-title">Activity Logging</h5>
                  <p className="card-text text-muted">
                    Log workouts with duration, calories, and distance metrics.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card border-0 h-100">
                <div className="card-body">
                  <div className="display-6 mb-3">👫</div>
                  <h5 className="card-title">Team Management</h5>
                  <p className="card-text text-muted">
                    Create and manage teams with member collaboration.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card border-0 h-100">
                <div className="card-body">
                  <div className="display-6 mb-3">💪</div>
                  <h5 className="card-title">Workout Plans</h5>
                  <p className="card-text text-muted">
                    Create personalized workout plans with difficulty levels.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card border-0 h-100">
                <div className="card-body">
                  <div className="display-6 mb-3">🏆</div>
                  <h5 className="card-title">Leaderboard</h5>
                  <p className="card-text text-muted">
                    Track rankings and compete with friends on points.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card border-0 h-100">
                <div className="card-body">
                  <div className="display-6 mb-3">📊</div>
                  <h5 className="card-title">Analytics</h5>
                  <p className="card-text text-muted">
                    View detailed statistics and performance metrics.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-5" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
        <div className="container text-center">
          <h2 className="h2 fw-bold text-white mb-3">Ready to get started?</h2>
          <p className="lead text-white opacity-90 mb-4">
            Join thousands of fitness enthusiasts tracking their goals.
          </p>
          <div className="d-flex gap-3 justify-content-center">
            <Link className="btn btn-light btn-lg fw-semibold" to="/users">Create Account</Link>
            <Link className="btn btn-outline-light btn-lg fw-semibold" to="/workouts">Browse Workouts</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
