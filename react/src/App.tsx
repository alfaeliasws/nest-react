import './App.css'
import { useNavigate } from 'react-router-dom'

function App() {
  const navigate = useNavigate();

  return (
    <main className='root'>
      <h1>Headline Application</h1>
      <div className="card">
        <button onClick={() => navigate("/login")}>
          Login
        </button>
        <p>
          Created with react TS (front end) and NestJS (back end)
        </p>
      </div>
    </main>
  )
}

export default App
