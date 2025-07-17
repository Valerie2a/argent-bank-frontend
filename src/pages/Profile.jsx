import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProfile, fetchUserProfile } from "../features/users/userSlice";
import BankAccountBalance from "../components/BankAccountBalance";
import { useNavigate } from "react-router-dom";
import TransactionTable from "../components/TransactionTable";
import transactionsMock from "../mocks/transactionsMock";

function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Récupération des données utilisateur depuis le store Redux
  const { firstName, lastName, userName, token, loading, error } = useSelector(
    (state) => state.user
  );

  // État local
  const [newUserName, setNewUserName] = useState("");
  const [expandedAccountId, setExpandedAccountId] = useState(null); // ✅ déplacé ici

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
    setNewUserName(userName);
  };

  // Données fictives des comptes à afficher
  const accounts = [
    {
      id: 3448,
      title: "Argent Bank Checking (x3448)",
      amount: "48,098.43",
      description: "Available balance",
    },
    {
      id: 6712,
      title: "Argent Bank Savings (x6712)",
      amount: "12,345.67",
      description: "Available balance",
    },
    {
      id: 8349,
      title: "Argent Bank Credit Card (x8349)",
      amount: "184.30",
      description: "Current balance",
    },
  ];

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
        <div className="auth-button">
          <button className="save" type="submit" disabled={loading}>
            {loading ? "Saving..." : "Save"}
          </button>
          <button className="cancel" type="button" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {accounts.map((account) => (
        <div key={account.id}>
          <BankAccountBalance
            title={account.title}
            amount={account.amount}
            description={account.description}
            onToggle={() =>
              setExpandedAccountId(
                expandedAccountId === account.id ? null : account.id
              )
            }
          />
          {expandedAccountId === account.id && (
            <TransactionTable transactions={transactionsMock[account.id] || []} />
          )}
        </div>
      ))}
    </div>
  );
}

export default Profile;

