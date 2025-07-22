import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Profile from './pages/Profile'
import UserHeader from './components/UserHeader'
import PrivateRoute from './components/PrivateRoute' 

function AppWithHeader() {
  return (
    <>
      <UserHeader />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        } />
      </Routes>
    </>
  )
}

function App() {
  return (
    <Router>
      <AppWithHeader />
    </Router>
  )
}

export default App