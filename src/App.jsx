import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Profile from './pages/Profile'
import TransactionDetail from './pages/TransactionDetail'

import HomeHeader from './components/HomeHeader'
import UserHeader from './components/UserHeader'

function AppWithHeader() {
  const location = useLocation()
  const isHome = location.pathname === '/'

  return (
    <>
      {isHome ? <HomeHeader /> : <UserHeader />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/transactions/:id" element={<TransactionDetail />} />
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
