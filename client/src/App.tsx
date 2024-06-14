import { useEffect, useState } from 'react'
import { Box, TextField, Grid } from '@mui/material'
import CalculatorButton from './CalculatorButton' // Make sure to import or define this component

export const App = () => {
  const [currentInput, setCurrentInput] = useState<string>('')
  const [accumulator, setAccumulator] = useState<number | null>(null)
  const [operation, setOperation] = useState<string | null>(null)

  useEffect(() => {
    console.log(operation)
  }, [operation])

  const handleNumberClick = (number: string) => {
    setCurrentInput(currentInput === '0' || operation ? number : currentInput + number)
  }

  const handleClear = () => {
    setCurrentInput('')
    setAccumulator(null)
    setOperation(null)
  }

  const handleDelete = () => {
    setCurrentInput(currentInput.slice(0, -1))
  }

  const handleDot = () => {
    if (!currentInput.includes('.')) {
      setCurrentInput(currentInput + '.')
    }
  }

  const handleOperator = (newOperation: string) => {
    if (operation && accumulator !== null) {
      const result = calculate(accumulator, parseFloat(currentInput), operation)
      setAccumulator(result)
      setCurrentInput('')
      setOperation(newOperation)
    } else {
      setAccumulator(parseFloat(currentInput))
      setCurrentInput('')
      setOperation(newOperation)
    }
  }

  const handleCalculate = () => {
    if (operation && accumulator !== null) {
      const result = calculate(accumulator, parseFloat(currentInput), operation)
      setCurrentInput(String(result))
      setAccumulator(null)
      setOperation(null)
    }
  }

  const handlePlusMinus = () => {
    if (currentInput !== '') {
      // Check if there's something to invert
      setCurrentInput(currentInput.startsWith('-') ? currentInput.slice(1) : '-' + currentInput)
    }
  }

  const calculate = (first: number, second: number, operation: string): number => {
    switch (operation) {
      case '+':
        return first + second
      case '-':
        return first - second
      case '*':
        return first * second
      case '/':
        return second !== 0 ? first / second : 0 // Prevent division by zero
      default:
        return 0
    }
  }

  return (
    <Box
      sx={{
        minWidth: 320,
        maxWidth: 400,
        m: 'auto',
        p: 2,
        pt: 3,
        backgroundColor: 'background.paper',
        borderRadius: 2,
      }}
    >
      <TextField
        fullWidth
        variant="outlined"
        value={currentInput || (accumulator ? String(accumulator) : '0')}
        InputProps={{ readOnly: true }}
        inputProps={{ style: { textAlign: 'right' } }}
        sx={{ mb: 2 }}
      />
      <Grid container spacing={1}>
        {['CE', 'C', 'Del', '/'].map((op, index) => (
          <Grid item xs={3} key={index}>
            <CalculatorButton
              label={op}
              onClick={() => {
                if (op === 'CE') {
                  handleClear()
                } else if (op === 'C') {
                  handleClear()
                } else if (op === 'Del') {
                  handleDelete()
                } else {
                  handleOperator(op)
                }
              }}
              color="secondary"
            />
          </Grid>
        ))}
        {['7', '8', '9', '*', '4', '5', '6', '-', '1', '2', '3', '+'].map((op) => (
          <Grid item xs={3} key={op}>
            <CalculatorButton
              label={op}
              onClick={() => {
                if (!isNaN(Number(op))) {
                  handleNumberClick(op)
                } else {
                  handleOperator(op)
                }
              }}
            />
          </Grid>
        ))}
        <Grid item xs={3}>
          <CalculatorButton label="+-" onClick={handlePlusMinus} />
        </Grid>
        <Grid item xs={3}>
          <CalculatorButton label="0" onClick={() => handleNumberClick('0')} />
        </Grid>
        <Grid item xs={3}>
          <CalculatorButton label="." onClick={handleDot} />
        </Grid>
        <Grid item xs={3}>
          <CalculatorButton label="=" onClick={handleCalculate} color="primary" />
        </Grid>
      </Grid>
    </Box>
  )
}
