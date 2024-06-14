import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <div className="calculator-wrap">
      <div className="input-row">
        <input disabled />
      </div>
      <div className="row-btns">
        <button className="clear-current-field-btn">ce</button>
        <button className="clear-btn">c</button>
        <button className="dell-btn">del</button>
        <button className="action-btn">/</button>
      </div>
      <div className="row-btns">
        <button className="number">7</button>
        <button className="number">8</button>
        <button className="number">9</button>
        <button className="action-btn">*</button>
      </div>
      <div className="row-btns">
        <button className="number">4</button>
        <button className="number">5</button>
        <button className="number">6</button>
        <button className="action-btn">-</button>
      </div>
      <div className="row-btns">
        <button className="number">1</button>
        <button className="number">2</button>
        <button className="number">3</button>
        <button className="action-btn">+</button>
      </div>
      <div className="row-btns">
        <button className="plus-minus-btn">+-</button>
        <button className="number">0</button>
        <button className="dot-btn">.</button>
        <button className="calculate-btn">=</button>
      </div>
    </div>
  </React.StrictMode>
)
