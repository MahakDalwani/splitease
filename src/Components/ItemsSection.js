import React from 'react'

function ItemsSection({ items, people, onAdd, onRemove, onUpdate, onToggle }) {
  return (
    <div className="card">

      <div className="card-header">
        <span className="step-number">02</span>
        <div>
          <h2 className="card-title">What are you Splitting?</h2>
          <p className="card-subtitle">Add expenses and assign who shares each one</p>
        </div>
      </div>

      {items.length === 0 ? (
        <p className="hint">No expenses added yet. Click below to add one.</p>
      ) : (
        <div className="items-list">
          {items.map(item => (
            <div key={item.id} className="item-row">

              {/* Item name input */}
              <input
                type="text"
                className="item-name-input"
                placeholder="What is this? (e.g. Petrol, Groceries, Hotel)"
                value={item.name}
                onChange={(e) => onUpdate(item.id, 'name', e.target.value)}
              />

              {/* Item price input */}
              <input
                type="number"
                className="item-price-input"
                placeholder="₹ Amount"
                value={item.price || ''}
                onChange={(e) => onUpdate(item.id, 'price', parseFloat(e.target.value) || 0)}
              />

              {/* Checkboxes — one per person */}
              <div className="checkbox-group">
                <p className="checkbox-label-title">Shared by:</p>
                {people.map(person => (
                  <label key={person} className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={item.assignedTo.includes(person)}
                      onChange={() => onToggle(item.id, person)}
                    />
                    <span>{person}</span>
                  </label>
                ))}
              </div>

              {/* Remove item button */}
              <button
                className="remove-btn"
                onClick={() => onRemove(item.id)}
              >
                ✕ Remove
              </button>

            </div>
          ))}
        </div>
      )}

      <button className="add-item-btn" onClick={onAdd}>
        + Add Expense
      </button>

    </div>
  )
}

export default ItemsSection