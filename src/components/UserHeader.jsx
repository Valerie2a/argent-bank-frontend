import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle, faCog, faSignOutAlt, faPowerOff } from '@fortawesome/free-solid-svg-icons'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../features/users/userSlice'
import { Link } from 'react-router-dom'
import logo from '../assets/img/argentBankLogo.png'
import "../assets/css/UserHeader.css";

export default function UserHeader() {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <header className="user-header">
      <Link to="/" className="user-header-logo">
        <img src={logo} alt="Argent Bank Logo" />
      </Link>
      {user.token && (
        <div className="user-header-icons">
          <span className="user-header-name">
            <FontAwesomeIcon icon={faUserCircle} />
            {user.userName}
          </span>
          <FontAwesomeIcon icon={faCog} className="user-header-icon" />
          <FontAwesomeIcon icon={faPowerOff} className="user-header-icon" onClick={handleLogout} />
        </div>
      )}
    </header>
  )
}
