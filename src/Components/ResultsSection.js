import React from 'react'

function ResultsSection({ people, results, transactions, onReset }) {

  function handleCopy() {
    // Build the summary text
    let text = '💸 SplitEase Summary\n\n'
    text += 'Individual Totals:\n'

    people.forEach(person => {
      text += `${person}: ₹${results[person].toFixed(2)}\n`
    })

    text += '\nSettle Up:\n'

    if (transactions.length === 0) {
      text += 'Everyone pays equally! 🎉\n'
    } else {
      transactions.forEach(t => {
        text += `${t.from} pays ${t.to} → ₹${t.amount.toFixed(2)}\n`
      })
    }

    text += '\nSplit using SplitEase — splitease.vercel.app'

    navigator.clipboard.writeText(text)
    alert('Summary copied! 📋 Paste it anywhere.')
  }

  return (
    <div className="card results-card" id="results">

      <div className="card-header">
        <span className="step-number">04</span>
        <div>
          <h2 className="card-title">Here's the Split</h2>
          <p className="card-subtitle">Fair, proportional, and simplified</p>
        </div>
      </div>

      {/* INDIVIDUAL TOTALS */}
      <div className="totals-section">
        <h3 className="section-label">Each person pays:</h3>
        {people.map(person => (
          <div key={person} className="result-row">
            <div className="result-avatar">
              {person.charAt(0).toUpperCase()}
            </div>
            <span className="result-name">{person}</span>
            <span className="result-amount">
              ₹{results[person].toFixed(2)}
            </span>
          </div>
        ))}
      </div>

      <hr className="divider" />

      {/* SIMPLIFIED TRANSACTIONS */}
      <div className="transactions-section">
        <h3 className="section-label">
          Settle up in {transactions.length} transaction{transactions.length !== 1 ? 's' : ''}:
        </h3>

        {transactions.length === 0 ? (
          <p className="hint">Everyone pays equally! 🎉</p>
        ) : (
          transactions.map((t, index) => (
            <div key={index} className="transaction-row">
              <div className="transaction-avatar from">
                {t.from.charAt(0).toUpperCase()}
              </div>
              <span className="transaction-name">{t.from}</span>
              <span className="transaction-arrow">pays →</span>
              <div className="transaction-avatar to">
                {t.to.charAt(0).toUpperCase()}
              </div>
              <span className="transaction-name">{t.to}</span>
              <span className="transaction-amount">₹{t.amount.toFixed(2)}</span>
            </div>
          ))
        )}
      </div>

      {/* ACTION BUTTONS */}
      <div className="action-row">
        <button className="copy-btn" onClick={handleCopy}>
          📋 Copy Summary
        </button>
        <button className="reset-btn" onClick={onReset}>
          🔄 Reset Everything
        </button>
      </div>

    </div>
  )
}

export default ResultsSection