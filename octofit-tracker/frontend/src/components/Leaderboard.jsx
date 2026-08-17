import { useEffect, useState } from 'react';
import { fetchJson } from '../api';

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadLeaderboard() {
      try {
        setLoading(true);
        const data = await fetchJson('/api/leaderboard');
        // Handle both array and paginated responses
        setLeaderboard(Array.isArray(data) ? data : data.data || data.leaderboard || []);
        setError('');
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadLeaderboard();
  }, []);

  if (loading) return <div className="alert alert-info">Loading leaderboard...</div>;
  if (error) return <div className="alert alert-danger" role="alert">{error}</div>;

  return (
    <div className="container py-4">
      <h1 className="mb-4">🏆 Leaderboard</h1>

      <div className="row mb-4">
        <div className="col-md-12">
          <div className="card">
            <div className="card-body text-center">
              <h5 className="card-title">Top Performers</h5>
              <p className="text-muted">Compete with your team and climb the ranks!</p>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h5 className="mb-0">Rankings</h5>
        </div>
        <div className="table-responsive">
          <table className="table table-hover mb-0">
            <thead className="table-light">
              <tr>
                <th style={{ width: '60px' }}>Rank</th>
                <th>User</th>
                <th>Points</th>
                <th>Team</th>
                <th>Streak</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center text-muted py-4">
                    No leaderboard entries yet
                  </td>
                </tr>
              ) : (
                leaderboard.map((entry, index) => (
                  <tr key={entry._id || entry.id} className={index < 3 ? 'table-light fw-bold' : ''}>
                    <td>
                      <div style={{ fontSize: '1.5rem' }}>
                        {index === 0 && '🥇'}
                        {index === 1 && '🥈'}
                        {index === 2 && '🥉'}
                        {index >= 3 && `#${index + 1}`}
                      </div>
                    </td>
                    <td>{entry.userName || entry.userId || 'Unknown'}</td>
                    <td><strong>{entry.points}</strong></td>
                    <td>{entry.teamName || entry.teamId || '-'}</td>
                    <td>{entry.streak || 0}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {leaderboard.length > 0 && (
        <div className="row mt-4">
          <div className="col-md-4">
            <div className="card text-center">
              <div className="card-body">
                <h6 className="card-subtitle mb-2 text-muted">Top Score</h6>
                <h3 className="card-title">{leaderboard[0]?.points || 0}</h3>
                <p className="card-text text-truncate">{leaderboard[0]?.userName || leaderboard[0]?.userId || 'N/A'}</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card text-center">
              <div className="card-body">
                <h6 className="card-subtitle mb-2 text-muted">Average Points</h6>
                <h3 className="card-title">
                  {Math.round(leaderboard.reduce((sum, e) => sum + (e.points || 0), 0) / leaderboard.length)}
                </h3>
                <p className="card-text">{leaderboard.length} participants</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card text-center">
              <div className="card-body">
                <h6 className="card-subtitle mb-2 text-muted">Total Points</h6>
                <h3 className="card-title">
                  {leaderboard.reduce((sum, e) => sum + (e.points || 0), 0)}
                </h3>
                <p className="card-text">Combined</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
