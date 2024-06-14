import { useState } from 'react'
import { evaluate } from 'mathjs'

import './styles.css'

export const App = () => {
  const [input, setInput] = useState<string>('')

  const handleNumberClick = (number: string) => {
    setInput(input + number)
  }

  const handleClear = () => {
    setInput('')
  }

  const handleDelete = () => {
    setInput(input.slice(0, -1))
  }

  const handleOperator = (operator: string) => {
    setInput(input + operator)
  }

  const handleCalculate = () => {
    try {
      const result = evaluate(input)
      setInput(String(result))
    } catch (error) {
      setInput('Error')
    }
  }

  const handlePlusMinus = () => {
    if (input.startsWith('-')) {
      setInput(input.slice(1))
    } else {
      setInput('-' + input)
    }
  }

  const handleDot = () => {
    if (!input.includes('.')) {
      setInput(input + '.')
    }
  }

  return (
    <div className="calculator-wrap">
      <div className="input-row">
        <input value={input} disabled />
      </div>
      <div className="row-btns">
        <button
          className="clear-current-field-btn"
          onClick={() => setInput('')}
        >
          ce
        </button>
        <button className="clear-btn" onClick={handleClear}>
          c
        </button>
        <button className="dell-btn" onClick={handleDelete}>
          del
        </button>
        <button className="action-btn" onClick={() => handleOperator('/')}>
          /
        </button>
      </div>
      <div className="row-btns">
        <button className="number" onClick={() => handleNumberClick('7')}>
          7
        </button>
        <button className="number" onClick={() => handleNumberClick('8')}>
          8
        </button>
        <button className="number" onClick={() => handleNumberClick('9')}>
          9
        </button>
        <button className="action-btn" onClick={() => handleOperator('*')}>
          *
        </button>
      </div>
      <div className="row-btns">
        <button className="number" onClick={() => handleNumberClick('4')}>
          4
        </button>
        <button className="number" onClick={() => handleNumberClick('5')}>
          5
        </button>
        <button className="number" onClick={() => handleNumberClick('6')}>
          6
        </button>
        <button className="action-btn" onClick={() => handleOperator('-')}>
          -
        </button>
      </div>
      <div className="row-btns">
        <button className="number" onClick={() => handleNumberClick('1')}>
          1
        </button>
        <button className="number" onClick={() => handleNumberClick('2')}>
          2
        </button>
        <button className="number" onClick={() => handleNumberClick('3')}>
          3
        </button>
        <button className="action-btn" onClick={() => handleOperator('+')}>
          +
        </button>
      </div>
      <div className="row-btns">
        <button className="plus-minus-btn" onClick={handlePlusMinus}>
          +-
        </button>
        <button className="number" onClick={() => handleNumberClick('0')}>
          0
        </button>
        <button className="dot-btn" onClick={handleDot}>
          .
        </button>
        <button className="calculate-btn" onClick={handleCalculate}>
          =
        </button>
      </div>
    </div>
  )
}
