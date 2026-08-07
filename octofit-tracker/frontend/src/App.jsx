import './App.css'

function App() {
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
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default App
