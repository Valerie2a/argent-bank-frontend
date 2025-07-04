import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProfile } from "../features/users/userSlice";

function Profile() {
  const dispatch = useDispatch();
  const { firstName, lastName, userName, token, loading, error  } = useSelector ((state) => state.user);

  const [ editMode , setEditMode ]  = useState(false)
  const [ newUserName, setNewUserName ] = useState ('')

  useEffect(() => {
    setNewUserName(userName || '');
  }, [userName]);


    const handleSubmit = (e) => {
      e.preventDefault();
      dispatch(updateUserProfile({ userName: newUserName})) ;
      setEditMode(false);
    };

return (
    <div className="profile">
      <h2>Bonjour {firstName} {lastName}</h2>

      {!editMode ? (
        <>
          <p>Nom d'utilisateur : <strong>{userName}</strong></p>
          <button onClick={() => setEditMode(true)}>Modifier le nom d'utilisateur</button>
        </>
      ) : (
        <form onSubmit={handleSubmit}>
          <label>
            Nouveau nom d'utilisateur :
            <input
              type="text"
              value={newUserName}
              onChange={(e) => setNewUserName(e.target.value)}
            />
          </label>
          <button type="submit">Enregistrer</button>
          <button type="button" onClick={() => setEditMode(false)}>Annuler</button>
        </form>
      )}

      {loading && <p>Chargement...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default Profile;
