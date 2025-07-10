import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProfile, fetchUserProfile } from "../features/users/userSlice";

function Profile() {
  const dispatch = useDispatch();

  // Récupération des données utilisateur depuis le store Redux
  const { firstName, lastName, userName, token, loading, error } = useSelector(
    (state) => state.user
  );

  // État local pour le champ modifiable : userName
  const [newUserName, setNewUserName] = useState("");

  // Récupération du profil si token présent
  useEffect(() => {
    if (token) {
      dispatch(fetchUserProfile(token));
    }
  }, [dispatch, token]);

  // Initialisation du champ avec la valeur Redux
  useEffect(() => {
    setNewUserName(userName || "");
  }, [userName]);

  // Envoi des modifications
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserProfile({ userName: newUserName }));
  };

  // Réinitialisation du champ lors d'un cancel
  const handleCancel = (e) => {
    e.preventDefault();
    console.log("Cancel triggered");
    setNewUserName(userName);
  };

  return (
    <div className="profile">
      <h2>Edit user info</h2>
      <form onSubmit={handleSubmit} className="edit-form">
        <div>
          <label htmlFor="username">User name:</label>
          <input
            type="text"
            id="username"
            value={newUserName}
            onChange={(e) => setNewUserName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="firstName">First name:</label>
          <input type="text" id="firstName" value={firstName} disabled />
        </div>
        <div>
          <label htmlFor="lastName">Last name:</label>
          <input type="text" id="lastName" value={lastName} disabled />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Saving..." : "Save"}
        </button>
        <button type="button" onClick={handleCancel}>
          Cancel
        </button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default Profile;
