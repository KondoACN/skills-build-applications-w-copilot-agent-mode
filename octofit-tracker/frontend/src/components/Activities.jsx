import { useEffect, useState } from 'react';

export default function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    userId: '',
    type: '',
    durationMinutes: '',
    caloriesBurned: '',
    distanceKm: '',
    note: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const activitiesApiUrl = import.meta.env.VITE_CODESPACE_NAME
    ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities`
    : 'http://localhost:8000/api/activities';

  useEffect(() => {
    async function loadActivities() {
      try {
        setLoading(true);
        const response = await fetch(activitiesApiUrl);

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const data = await response.json();
        setActivities(Array.isArray(data) ? data : data.data || data.activities || []);
        setError('');
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadActivities();
  }, [activitiesApiUrl]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'durationMinutes' || name === 'caloriesBurned' || name === 'distanceKm'
        ? value === '' ? '' : Number(value)
        : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      const response = await fetch(activitiesApiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to create activity');

      const newActivity = await response.json();
      setActivities((current) => [newActivity, ...current]);
      setFormData({
        userId: '',
        type: '',
        durationMinutes: '',
        caloriesBurned: '',
        distanceKm: '',
        note: '',
      });
      setError('');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <div className="alert alert-info">Loading activities...</div>;

  const formatDate = (date) => new Date(date).toLocaleDateString();

  return (
    <div className="container py-4">
      <h1 className="mb-4">Activities</h1>

      <div className="row mb-4">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Log New Activity</h5>
              {error && <div className="alert alert-danger" role="alert">{error}</div>}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="userId" className="form-label">User ID</label>
                  <input
                    type="text"
                    className="form-control"
                    id="userId"
                    name="userId"
                    value={formData.userId}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="type" className="form-label">Activity Type</label>
                  <input
                    type="text"
                    className="form-control"
                    id="type"
                    name="type"
                    placeholder="e.g., Running, Cycling, Swimming"
                    value={formData.type}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="durationMinutes" className="form-label">Duration (minutes)</label>
                  <input
                    type="number"
                    className="form-control"
                    id="durationMinutes"
                    name="durationMinutes"
                    value={formData.durationMinutes}
                    onChange={handleInputChange}
                    min="0"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="caloriesBurned" className="form-label">Calories Burned</label>
                  <input
                    type="number"
                    className="form-control"
                    id="caloriesBurned"
                    name="caloriesBurned"
                    value={formData.caloriesBurned}
                    onChange={handleInputChange}
                    min="0"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="distanceKm" className="form-label">Distance (km)</label>
                  <input
                    type="number"
                    className="form-control"
                    id="distanceKm"
                    name="distanceKm"
                    value={formData.distanceKm}
                    onChange={handleInputChange}
                    min="0"
                    step="0.1"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="note" className="form-label">Note</label>
                  <textarea
                    className="form-control"
                    id="note"
                    name="note"
                    value={formData.note}
                    onChange={handleInputChange}
                    rows="2"
                  />
                </div>
                <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                  {isSubmitting ? 'Logging...' : 'Log Activity'}
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Activity Statistics</h5>
              <p><strong>Total Activities:</strong> {activities.length}</p>
              <p><strong>Total Calories:</strong> {activities.reduce((sum, a) => sum + (a.caloriesBurned || 0), 0)}</p>
              <p><strong>Total Distance:</strong> {activities.reduce((sum, a) => sum + (a.distanceKm || 0), 0).toFixed(2)} km</p>
              <p><strong>Total Duration:</strong> {activities.reduce((sum, a) => sum + (a.durationMinutes || 0), 0)} min</p>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h5 className="mb-0">Recent Activities</h5>
        </div>
        <div className="table-responsive">
          <table className="table table-hover mb-0">
            <thead className="table-light">
              <tr>
                <th>Type</th>
                <th>User</th>
                <th>Duration</th>
                <th>Calories</th>
                <th>Distance</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity) => (
                <tr key={activity._id || activity.id}>
                  <td>{activity.type}</td>
                  <td>{activity.userId}</td>
                  <td>{activity.durationMinutes} min</td>
                  <td>{activity.caloriesBurned}</td>
                  <td>{activity.distanceKm} km</td>
                  <td>{formatDate(activity.date)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
