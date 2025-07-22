import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle, faCog, faSignOutAlt, faPowerOff } from '@fortawesome/free-solid-svg-icons'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../features/users/userSlice'
import { clearTransactions } from '../features/transactions/transactionSlice'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../assets/img/argentBankLogo.png'

export default function UserHeader() {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(clearTransactions()); // Clear transactions d'abord
    dispatch(logout()); // Clear user ensuite
    navigate('/'); // Hook pour navigation
  };

  return (
    <header className="user-header">
      <Link to="/" className="user-header-logo">
        <img src={logo} alt="Argent Bank Logo" />
      </Link>
      
      <div className="user-header-icons">
        {user.token ? (
          <>
          {/* SI CONNECTÉ - Affichage complet avec nom + icônes */}
            <Link to="/profile" className="user-header-name"> {/* NOM CLIQUABLE */}
              <FontAwesomeIcon icon={faUserCircle} />
              {user.userName}
            </Link>
            <FontAwesomeIcon icon={faCog} className="user-header-icon" />
            <span className="user-header-signout" onClick={handleLogout}>
              <FontAwesomeIcon icon={faSignOutAlt} />
              Sign out
            </span>
          </>
        ) : (
          <Link to="/login" className="main-nav-item"> {/* SI DÉCONNECTÉ - Affichage "Sign In" */}
            <FontAwesomeIcon icon={faUserCircle} />
            Sign In
          </Link>
        )}
      </div>
    </header>
  )
}