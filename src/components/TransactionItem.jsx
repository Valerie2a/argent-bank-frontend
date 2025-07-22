import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
{ /*format date maquette*/ }
const formatDate = (isoDate) => {
  const date = new Date(isoDate);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = String(date.getFullYear()).slice(2); 
  return `${day}/${month}/${year}`;
};


function TransactionItem({ transaction, onUpdate }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditingCategory, setIsEditingCategory] = useState(false);
  const [isEditingNote, setIsEditingNote] = useState(false);
  const [tempCategory, setTempCategory] = useState(transaction.category || '');
  const [tempNote, setTempNote] = useState(transaction.note || '');

  const categories = [
    'Food',
    'Shopping', 
    'Income',
    'Transfer',
    'Payment',
    'Entertainment',
    'Transport',
    'Other'
  ];

  const handleCategorySubmit = () => {
    onUpdate(transaction.id, { category: tempCategory });
    setIsEditingCategory(false);
  };

  const handleNoteSubmit = () => {
    onUpdate(transaction.id, { note: tempNote });
    setIsEditingNote(false);
  };

  const handleCategoryCancel = () => {
    setTempCategory(transaction.category || '');
    setIsEditingCategory(false);
  };

  const handleNoteCancel = () => {
    setTempNote(transaction.note || '');
    setIsEditingNote(false);
  };

  const formatAmount = (amount) => {
    return `$${amount.toFixed(2)}`;
  };

  return (
    <div className="transaction-item-container">
      <div 
        className="transaction-main-row" 
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="transaction-date">{formatDate(transaction.date)}</div>
        <div className="transaction-description">{transaction.description}</div>
        <div className="transaction-amount">{formatAmount(transaction.amount)}</div>
        <div className="transaction-balance">{formatAmount(transaction.balance)}</div>
        <div className="transaction-chevron">
          <FontAwesomeIcon icon={isExpanded ? faChevronUp : faChevronDown} />
        </div>
      </div>


      {/* DÉTAILS DÉPLIABLES */}
      {isExpanded && (
        <div className="transaction-details-expanded">
          
          {/* Transaction Type */}
          <div className="detail-row">
            <span className="detail-label">Transaction Type</span>
            <span className="detail-value">Electronic</span>
          </div>

          {/* Categories avec crayon */}
          <div className="detail-row">
            <span className="detail-label">Category</span>
            <div className="detail-value-with-edit">
              {isEditingCategory ? (
                <div className="edit-mode">
                  <select 
                    value={tempCategory}
                    onChange={(e) => setTempCategory(e.target.value)}
                    className="edit-select"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                  <button onClick={handleCategorySubmit} className="save-btn">✓</button>
                  <button onClick={handleCategoryCancel} className="cancel-btn">✕</button>
                </div>
              ) : (
                <div className="display-mode">
                  <span>{transaction.category || 'Food'}</span>
                  <FontAwesomeIcon 
                    icon={faPencilAlt} 
                    className="edit-pencil"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsEditingCategory(true);
                    }}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Note avec crayon */}
          <div className="detail-row">
            <span className="detail-label">Note</span>
            <div className="detail-value-with-edit">
              {isEditingNote ? (
                <div className="edit-mode">
                  <input
                    type="text"
                    value={tempNote}
                    onChange={(e) => setTempNote(e.target.value)}
                    className="edit-input"
                    placeholder="Add a note..."
                  />
                  <button onClick={handleNoteSubmit} className="save-btn">✓</button>
                  <button onClick={handleNoteCancel} className="cancel-btn">✕</button>
                </div>
              ) : (
                <div className="display-mode">
                  <span>{transaction.note || 'lorem ipsum'}</span>
                  <FontAwesomeIcon 
                    icon={faPencilAlt} 
                    className="edit-pencil"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsEditingNote(true);
                    }}
                  />
                </div>
              )}
            </div>
          </div>

        </div>
      )}
    </div>
  );
}

export default TransactionItem;