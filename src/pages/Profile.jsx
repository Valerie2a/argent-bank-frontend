// Importation des hooks React, Redux, et des fonctions utiles
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// Import des actions liées à l'utilisateur
import { updateUserProfile, fetchUserProfile } from "../features/users/userSlice";

// Import des composants personnalisés
import BankAccountBalance from "../components/BankAccountBalance";
import TransactionItem from "../components/TransactionItem";

// Import des actions liées aux transactions
import { fetchTransactions, updateTransaction } from "../features/transactions/transactionSlice";

function Profile() {
  const dispatch = useDispatch();

  // Récupère les données de l'utilisateur depuis le store Redux
  const { firstName, lastName, userName, token, loading, error } = useSelector((state) => state.user);

  // Récupère les transactions groupées par compte
  const { data: transactionsByAccount = {}, loading: txLoading = false, error: txError = null } = useSelector((state) => state.transaction || {});

  // État local pour gérer l'édition du nom d'utilisateur
  const [isEditing, setIsEditing] = useState(false);
  const [newUserName, setNewUserName] = useState("");

  // Compte actuellement "déplié" pour voir ses transactions
  const [expandedAccountId, setExpandedAccountId] = useState(null);

  // Lorsque le token est disponible, on déclenche le fetch du profil utilisateur et des transactions
  useEffect(() => {
    if (token) {
      dispatch(fetchUserProfile());
      dispatch(fetchTransactions());
    }
  }, [dispatch, token]);

  // Met à jour l’état local du champ username quand la donnée Redux change
  useEffect(() => {
    setNewUserName(userName || "");
  }, [userName]);

  // Soumission du formulaire d'édition
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserProfile({ userName: newUserName }));
    setIsEditing(false);
  };

  // Annule la modification
  const handleCancel = (e) => {
    e.preventDefault();
    setNewUserName(userName);
    setIsEditing(false);
  };

  // Transforme les transactions en une liste d’objets "compte", à afficher dans la page
  const accounts = Object.entries(transactionsByAccount || {}).map(([accountId, transactions]) => ({
    id: accountId,
    title: `Argent Bank Account (${accountId})`,
    amount: transactions.length > 0 ? `${transactions[0].balance.toFixed(2)}` : "0.00",
    description: "Available Balance",
    transactions,
  }));

  // On ne montre les comptes que si on a un token et des comptes
  const shouldShowAccounts = token && accounts.length > 0;

  return (
    <>
      <main className="main bg-dark">
        <div className="profile-header">
          {/* Mode "non édition" : Affiche le nom et le bouton pour éditer */}
          {!isEditing ? (
            <>
            <h1>
              {userName || firstName ? (
                <>
                  Welcome back<br />{userName || firstName}!
                </>
              ) : (
               "Welcome to Argent Bank!"
              )}
            </h1>

              <button className="edit-button" onClick={() => setIsEditing(true)}>Edit Name</button>
            </>
          ) : (
            // Mode édition : formulaire pour modifier le nom d'utilisateur
            <div className="profile-form-wrapper">
              <h2>Edit user info</h2>
              <form onSubmit={handleSubmit} className="edit-form">
                <div className="form-group">
                  <label htmlFor="username" className="edit-form-label">User name:</label>
                  <input
                    type="text"
                    id="username"
                    className="edit-form-input"
                    value={newUserName}
                    onChange={(e) => setNewUserName(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="firstName" className="edit-form-label">First name:</label>
                  <input type="text" id="firstName" className="edit-form-input" value={firstName} disabled />
                </div>
                <div className="form-group">
                  <label htmlFor="lastName" className="edit-form-label">Last name:</label>
                  <input type="text" id="lastName" className="edit-form-input" value={lastName} disabled />
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

              {/* Affichage des éventuelles erreurs */}
              {error && <p className="error-message">{error}</p>}
              {txError && <p className="error-message">Erreur transactions: {txError}</p>}
            </div>
          )}
        </div>

        {/* Affichage des comptes si le token est présent et que les données sont disponibles */}
        {shouldShowAccounts ? (
          accounts.map((account) => (
            <div key={account.id} className="account-transactions-container">
              <BankAccountBalance
                title={account.title}
                amount={account.amount}
                description={account.description}
                onToggle={() =>
                  setExpandedAccountId(expandedAccountId === account.id ? null : account.id)
                }
              />

              {/* Affichage des transactions du compte sélectionné */}
              {expandedAccountId === account.id && (
                <div className="transactions-wrapper">
                  <div className="transaction-header">
                    <div className="header-cell">Date</div>
                    <div className="header-cell">Description</div>
                    <div className="header-cell">Amount</div>
                    <div className="header-cell">Balance</div>
                    <div className="header-cell"></div>
                  </div>

                  {account.transactions.length > 0 ? (
                    account.transactions.map((transaction) => (
                      <TransactionItem
                        key={transaction.id}
                        transaction={transaction}
                        onUpdate={(transactionId, updates) =>
                          dispatch(updateTransaction({ transactionId, updates }))
                        }
                      />
                    ))
                  ) : (
                    <div className="no-transactions">
                      <p>No transactions found for this account.</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))
        ) : (
          // Si aucun compte n'est disponible ou en cours de chargement
          <div>
            {token ? (
              txLoading ? (
                <p className="loading-message">Chargement des comptes...</p>
              ) : (
                <p className="loading-message">Aucun compte trouvé.</p>
              )
            ) : null}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="footer">
        <p className="footer-text">Copyright 2020 Argent Bank</p>
      </footer>
    </>
  );
}

export default Profile;
