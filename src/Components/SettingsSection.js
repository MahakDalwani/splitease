import React from 'react'

function SettingsSection({ tip, tax, onTipChange, onTaxChange }) {
  return (
    <div className="card settings-card">

      <div className="card-header">
        <span className="step-number">03</span>
        <div>
          <h2 className="card-title">Extra Charges</h2>
          <p className="card-subtitle">Optional tip and tax — split proportionally</p>
        </div>
      </div>

      <div className="sliders-row">

        {/* TIP SLIDER */}
        <div className="slider-box">
          <div className="slider-top">
            <span className="slider-label">Tip</span>
            <span className="slider-value">{tip}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="30"
            value={tip}
            onChange={(e) => onTipChange(parseInt(e.target.value))}
            className="slider"
          />
          <div className="slider-minmax">
            <span>0%</span>
            <span>30%</span>
          </div>
        </div>

        {/* TAX SLIDER */}
        <div className="slider-box">
          <div className="slider-top">
            <span className="slider-label">Tax</span>
            <span className="slider-value">{tax}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="30"
            value={tax}
            onChange={(e) => onTaxChange(parseInt(e.target.value))}
            className="slider"
          />
          <div className="slider-minmax">
            <span>0%</span>
            <span>30%</span>
          </div>
        </div>

      </div>

    </div>
  )
}

export default SettingsSection