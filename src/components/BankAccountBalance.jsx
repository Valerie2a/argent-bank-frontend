import React from "react";

function BankAccountBalance({ title, amount, description, onToggle }) {

  return (
    <section className="account">
      <div className="account-content-wrapper">
        <h3 className="account-title">{title}</h3>
        <p className="account-amount">${amount}</p>
        <p className="account-amount-description">{description}</p>
      </div>
      <div className="account-content-wrapper cta">
          <button className="transaction-button" onClick={onToggle}>
          View transactions
        </button>
      </div>
    </section>
  );
}

export default BankAccountBalance;
