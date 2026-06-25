import React, { useState } from 'react'

function PeopleSection({ people, onAdd, onRemove }) {
  // Local state just for the input box
  const [inputValue, setInputValue] = useState('')

  function handleAdd() {
    onAdd(inputValue)
    // Send the name up to App.js
    setInputValue('')
    // Clear the input after adding
  }

  function handleKeyPress(e) {
    if (e.key === 'Enter') {
      handleAdd()
    }
    // Press Enter instead of clicking button
  }

  return (
    <div className="card">

      <div className="card-header">
        <span className="step-number">01</span>
        <div>
          <h2 className="card-title">Who's Splitting?</h2>
          <p className="card-subtitle">Add everyone involved in this expense</p>
        </div>
      </div>

      <div className="input-row">
        <input
          type="text"
          className="text-input"
          placeholder="Enter name..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button className="add-btn" onClick={handleAdd}>
          + Add Person
        </button>
      </div>

      <div className="chips-container">
        {people.length === 0 ? (
          <p className="hint">Add at least 2 people to get started</p>
        ) : (
          people.map(person => (
            <div key={person} className="chip">
              <span>{person}</span>
              <button
                className="chip-remove"
                onClick={() => onRemove(person)}
              >
                ×
              </button>
            </div>
          ))
        )}
      </div>

    </div>
  )
}

export default PeopleSection