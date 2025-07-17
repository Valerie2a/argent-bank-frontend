// src/components/TransactionTable.jsx
import React from "react";
import "../assets/css/main.css";

function TransactionTable({ transactions }) {
  return (
    <div className="account-content">
    <table className="transaction-table">
      <thead>
        <tr>
          <th>Date</th>
          <th>Description</th>
          <th>Amount</th>
          <th>Balance</th>
          <th className="edit-col">Category</th>
          <th className="edit-col">Note</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((txn, index) => (
          <tr key={index}>
            <td>{txn.date}</td>
            <td>{txn.description}</td>
            <td>{txn.amount}</td>
            <td>{txn.balance}</td>
            <td>
              <button className="edit-button">Edit</button>
            </td>
            <td>
              <button className="edit-button">Edit</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  );
}

export default TransactionTable;

