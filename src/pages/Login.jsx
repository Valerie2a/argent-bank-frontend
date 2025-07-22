// Importation des hooks React, Redux, et des fonctions utiles
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// Import des actions liées à l'utilisateur
import { loginUser, fetchUserProfile } from '../features/users/userSlice'

// Import pour la navigation
import { useNavigate } from 'react-router-dom'

// Import de l'icône FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'

export default function Login() {
  // États locaux pour gérer les champs du formulaire
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
  // Hooks Redux et navigation
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  // Récupère les données de l'utilisateur depuis le store Redux
  const { token, error, loading } = useSelector(state => state.user)

  // Effet pour redirection automatique après connexion réussie
  useEffect(() => {
    if (token) {
      // Si un token existe, on récupère le profil utilisateur puis on redirige
      dispatch(fetchUserProfile()).then(() => {
        navigate('/profile')
      })
    }
  }, [token, dispatch, navigate]) // Se déclenche quand le token change

  // Gestion de la soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault() // Empêche le rechargement de la page
    // Déclenche l'action de connexion avec email et password
    dispatch(loginUser({ email, password }))
  }

  return (
    <>
      {/* Container principal avec fond noir */}
      <main className="main bg-dark">
        {/* Section du formulaire de connexion */}
        <section className="sign-in-content">
          {/* Icône utilisateur en haut du formulaire */}
          <FontAwesomeIcon icon={faUserCircle} className="sign-in-icon" />
          
          {/* Titre du formulaire */}
          <h1>Sign In</h1>
          
          {/* Formulaire de connexion */}
          <form onSubmit={handleSubmit}>
            {/* Champ Email */}
            <div className="input-wrapper">
              <label htmlFor="email">Username</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            {/* Champ Password */}
            <div className="input-wrapper">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            {/* Checkbox "Remember me" */}
            <div className="input-remember">
              <input type="checkbox" id="remember-me" />
              <label htmlFor="remember-me">Remember me</label>
            </div>

            {/* Affichage conditionnel du message d'erreur */}
            {error && <p className="error-message">{error}</p>}

            {/* Bouton de soumission avec état de chargement */}
            <button type="submit" className="sign-in-button" disabled={loading}>
              {loading ? 'Loading...' : 'Sign In'}
            </button>
          </form>
        </section>
      </main>
      
      {/* Pied de page */}
      <footer className="footer">
        <p className="footer-text">Copyright 2020 Argent Bank</p>
      </footer>
    </>
  )
}