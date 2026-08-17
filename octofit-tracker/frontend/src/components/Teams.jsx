import { useEffect, useState } from 'react';
import { fetchJson, getApiBaseUrl } from '../api';

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    async function loadTeams() {
      try {
        setLoading(true);
        const data = await fetchJson('/api/teams');
        // Handle both array and paginated responses
        setTeams(Array.isArray(data) ? data : data.data || data.teams || []);
        setError('');
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadTeams();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      const response = await fetch(
        `${getApiBaseUrl()}/api/teams`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        }
      );

      if (!response.ok) throw new Error('Failed to create team');

      const newTeam = await response.json();
      setTeams([...teams, newTeam]);
      setFormData({ name: '', description: '' });
      setError('');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <div className="alert alert-info">Loading teams...</div>;

  return (
    <div className="container py-4">
      <h1 className="mb-4">Teams</h1>

      <div className="row mb-4">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Create New Team</h5>
              {error && <div className="alert alert-danger" role="alert">{error}</div>}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Team Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <textarea
                    className="form-control"
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows="3"
                  />
                </div>
                <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                  {isSubmitting ? 'Creating...' : 'Create Team'}
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Team Statistics</h5>
              <p><strong>Total Teams:</strong> {teams.length}</p>
              <p><strong>Average Team Size:</strong> {teams.length > 0 ? Math.round(teams.reduce((sum, t) => sum + (t.memberCount || 0), 0) / teams.length) : 0}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        {teams.length === 0 ? (
          <div className="col-12">
            <div className="alert alert-info">No teams created yet</div>
          </div>
        ) : (
          teams.map((team) => (
            <div key={team._id || team.id} className="col-md-6 col-lg-4 mb-4">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">{team.name}</h5>
                  <p className="card-text text-muted">
                    {team.description || 'No description'}
                  </p>
                  <div className="mt-3">
                    <p className="mb-1"><small className="text-muted">Members: {team.memberCount || 0}</small></p>
                    <p className="mb-0"><small className="text-muted">Points: {team.totalPoints || 0}</small></p>
                  </div>
                </div>
                <div className="card-footer bg-transparent">
                  <button className="btn btn-sm btn-outline-primary w-100">View Team</button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
