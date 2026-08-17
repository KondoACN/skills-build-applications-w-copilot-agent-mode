import { useEffect, useState } from 'react';

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    difficulty: 'intermediate',
    exercises: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const workoutsApiUrl = import.meta.env.VITE_CODESPACE_NAME
    ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts`
    : 'http://localhost:8000/api/workouts';

  useEffect(() => {
    async function loadWorkouts() {
      try {
        setLoading(true);
        const response = await fetch(workoutsApiUrl);

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const data = await response.json();
        setWorkouts(Array.isArray(data) ? data : data.data || data.workouts || []);
        setError('');
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadWorkouts();
  }, [workoutsApiUrl]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      const workoutData = {
        ...formData,
        exercises: formData.exercises.split(',').map(ex => ex.trim()).filter(Boolean),
      };

      const response = await fetch(workoutsApiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(workoutData),
      });

      if (!response.ok) throw new Error('Failed to create workout');

      const newWorkout = await response.json();
      setWorkouts((current) => [...current, newWorkout]);
      setFormData({
        name: '',
        description: '',
        difficulty: 'intermediate',
        exercises: '',
      });
      setError('');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <div className="alert alert-info">Loading workouts...</div>;

  const difficultyBadgeColor = (difficulty) => {
    switch (difficulty) {
      case 'easy':
        return 'success';
      case 'intermediate':
        return 'warning';
      case 'hard':
        return 'danger';
      default:
        return 'secondary';
    }
  };

  return (
    <div className="container py-4">
      <h1 className="mb-4">Workouts</h1>

      <div className="row mb-4">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Create New Workout</h5>
              {error && <div className="alert alert-danger" role="alert">{error}</div>}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Workout Name</label>
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
                    rows="2"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="difficulty" className="form-label">Difficulty</label>
                  <select
                    className="form-select"
                    id="difficulty"
                    name="difficulty"
                    value={formData.difficulty}
                    onChange={handleInputChange}
                  >
                    <option value="easy">Easy</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="hard">Hard</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="exercises" className="form-label">Exercises (comma-separated)</label>
                  <textarea
                    className="form-control"
                    id="exercises"
                    name="exercises"
                    value={formData.exercises}
                    onChange={handleInputChange}
                    placeholder="e.g., Push-ups, Squats, Running"
                    rows="2"
                  />
                </div>
                <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                  {isSubmitting ? 'Creating...' : 'Create Workout'}
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Workout Statistics</h5>
              <p><strong>Total Workouts:</strong> {workouts.length}</p>
              <p><strong>Easy:</strong> {workouts.filter(w => w.difficulty === 'easy').length}</p>
              <p><strong>Intermediate:</strong> {workouts.filter(w => w.difficulty === 'intermediate').length}</p>
              <p><strong>Hard:</strong> {workouts.filter(w => w.difficulty === 'hard').length}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        {workouts.length === 0 ? (
          <div className="col-12">
            <div className="alert alert-info">No workouts created yet</div>
          </div>
        ) : (
          workouts.map((workout) => (
            <div key={workout._id || workout.id} className="col-md-6 mb-4">
              <div className="card h-100">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <h5 className="card-title mb-0">{workout.name}</h5>
                    <span className={`badge bg-${difficultyBadgeColor(workout.difficulty)}`}>
                      {workout.difficulty}
                    </span>
                  </div>
                  <p className="card-text text-muted">
                    {workout.description || 'No description'}
                  </p>
                  {workout.exercises && workout.exercises.length > 0 && (
                    <div className="mt-3">
                      <h6 className="small fw-semibold text-muted">Exercises:</h6>
                      <ul className="small mb-0">
                        {(Array.isArray(workout.exercises) ? workout.exercises : workout.exercises.split(',')).map((ex, idx) => (
                          <li key={idx}>{typeof ex === 'string' ? ex.trim() : ex.name || ex}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                <div className="card-footer bg-transparent">
                  <button className="btn btn-sm btn-outline-primary w-100">Start Workout</button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
