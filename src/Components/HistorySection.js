import React from 'react'

function HistorySection({ history, onEdit, onDelete, onClearAll }) {

  if (history.length === 0) {
    return null
  }

  return (
    <div className="card history-card">

      <div className="card-header">
        <span className="step-number">📜</span>
        <div>
          <h2 className="card-title">Past Splits</h2>
          <p className="card-subtitle">Saved automatically on this device</p>
        </div>
      </div>

      <div className="history-list">
        {history.map(entry => {
          const grandTotal = Object.values(entry.totals)
            .reduce((sum, amount) => sum + amount, 0)

          return (
            <div key={entry.id} className="history-item">

              <div className="history-item-top">
                <span className="history-date">{entry.date}</span>

                <div className="history-actions">
                  <button
                    className="history-edit-btn"
                    onClick={() => onEdit(entry)}
                  >
                    ✏️ 
                  </button>
                  <button
                    className="history-delete-btn"
                    onClick={() => onDelete(entry.id)}
                  >
                    🗑️
                  </button>
                </div>
              </div>

              <div className="history-people">
                {entry.people.join(', ')}
              </div>

              <div className="history-total">
                Total: ₹{grandTotal.toFixed(2)}
              </div>

              <div className="history-transactions">
                {entry.transactions.length === 0 ? (
                  <span className="hint">Split equally</span>
                ) : (
                  entry.transactions.map((t, i) => (
                    <span key={i} className="history-tx">
                      {t.from} → {t.to}: ₹{t.amount.toFixed(2)}
                    </span>
                  ))
                )}
              </div>

            </div>
          )
        })}
      </div>

      <button className="clear-history-btn" onClick={onClearAll}>
        Clear All History
      </button>

    </div>
  )
}

export default HistorySection