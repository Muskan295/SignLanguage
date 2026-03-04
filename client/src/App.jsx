import { Routes, Route } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Alphabet from './pages/Alphabet'
import Words from './pages/Words'
import Quiz from './pages/Quiz'
import Login from './pages/Login'
import SignIn from './pages/SignIn'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Navbar />
      <main className="max-w-[1400px] mx-auto px-2 sm:px-3 lg:px-4 py-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/alphabet" element={<Alphabet />} />
          <Route path="/words" element={<Words />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signin" element={<SignIn />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
