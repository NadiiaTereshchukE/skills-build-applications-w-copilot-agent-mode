import { NavLink, Route, Routes } from 'react-router-dom'
import './App.css'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'

function App() {
  return (
    <div className="app-shell">
      <header className="navbar navbar-expand-lg app-header">
        <div className="container-fluid app-container">
          <NavLink className="navbar-brand" to="/leaderboard">Octofit <span>Tracker</span></NavLink>
          <nav className="nav nav-pills ms-auto" aria-label="Primary navigation">
            {[
              ['leaderboard', 'Leaderboard'], ['activities', 'Activities'],
              ['workouts', 'Workouts'], ['teams', 'Teams'], ['users', 'Users'],
            ].map(([path, label]) => <NavLink key={path} className="nav-link" to={`/${path}`}>{label}</NavLink>)}
          </nav>
        </div>
      </header>
      <main className="container-fluid app-container py-4">
        <Routes>
          <Route path="/" element={<Leaderboard />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
