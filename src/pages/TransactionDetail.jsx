// src/pages/TransactionDetail.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import transactionsMock from '../mocks/transactionsMock'; // ou via API


function TransactionDetail() {
  const { id } = useParams();

  // Cherche la transaction dans le mock (à remplacer par API plus tard)
  const transactions = transactionsMock[id];

  if (!transactions) return <p>Transaction introuvable.</p>;

  return (
  <div className="transaction-detail-container">
    <div className="transaction-detail-card">
      {transactions.map((t, index) => (
      <div key={index}>
        <p><strong>Date :</strong> {t.date}</p>
        <p><strong>Description :</strong> {t.description}</p>
        <p><strong>Montant :</strong> {t.amount}</p>
        <p><strong>Solde :</strong> {t.balance}</p>
      </div>
    ))}
    </div>
  </div> 
  );
}

export default TransactionDetail;
