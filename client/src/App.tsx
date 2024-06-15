import { useCallback, useEffect, useState } from 'react'
import { Box, TextField, Grid } from '@mui/material'

import CalculatorButton from './components/CalculatorButton'
import { BottomToolbar } from './components/BottomToolbar'

export const App = () => {
  const [displayValue, setDisplayValue] = useState<string>('0')
  const [firstOperand, setFirstOperand] = useState<number | null>(null)
  const [secondOperand, setSecondOperand] = useState<number | null>(null)
  const [operator, setOperator] = useState<string | null>(null)
  const [firstOperandSet, setFirstOperandSet] = useState<boolean>(false)
  const [shouldClearField, setShouldClearField] = useState<boolean>(false)

  const inputDigit = useCallback(
    (digit: number) => {
      const parsedDigit = String(digit)
      const newDisplayValue =
        displayValue === '0' || shouldClearField ? parsedDigit : displayValue + parsedDigit
      setDisplayValue(newDisplayValue)

      if (shouldClearField) {
        setShouldClearField(false)
      }

      if (!firstOperandSet) {
        setFirstOperand(Number(newDisplayValue))
      } else {
        setSecondOperand(Number(newDisplayValue))
      }
    },
    [displayValue, firstOperandSet, shouldClearField]
  )

  const clearAll = () => {
    setDisplayValue('0')
    setOperator(null)
    setFirstOperand(null)
    setSecondOperand(null)
    setFirstOperandSet(false)
  }

  const calculate = useCallback(() => {
    if (firstOperand !== null && secondOperand !== null) {
      switch (operator) {
        case '+':
          return firstOperand + secondOperand
        case '-':
          return firstOperand - secondOperand
        case '*':
          return firstOperand * secondOperand
        case '/':
          return secondOperand !== 0 ? firstOperand / secondOperand : 0
        default:
          throw Error('Unknown operator')
      }
    } else {
      console.log('One or both of operands are empty.')
      return null
    }
  }, [firstOperand, operator, secondOperand])

  const handleEqual = useCallback(() => {
    const newValue = calculate()

    if (newValue !== null) {
      setFirstOperand(newValue)
      setDisplayValue(String(newValue))
    }
  }, [calculate])

  const performOperation = useCallback(
    (nextOperator: '/' | '-' | '+' | '*') => {
      setFirstOperandSet(true)
      setOperator(nextOperator)
      setShouldClearField(true)
      setSecondOperand(null)
      handleEqual()
    },
    [handleEqual]
  )

  const toggleSign = () => {
    const newValue = parseFloat(displayValue) * -1
    setDisplayValue(String(newValue))

    if (!firstOperandSet) {
      setFirstOperand(Number(newValue))
    } else {
      setSecondOperand(Number(newValue))
    }
  }

  const inputDot = useCallback(() => {
    if (displayValue.indexOf('.') !== -1) {
      return
    } else {
      const newValue = displayValue + '.'
      setDisplayValue(String(newValue))

      if (!firstOperandSet) {
        setFirstOperand(Number(newValue))
      } else {
        setSecondOperand(Number(newValue))
      }
    }
  }, [displayValue, firstOperandSet])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key >= '0' && e.key <= '9') {
        inputDigit(Number(e.key))
      } else if (e.key === '.' || e.key === ',') {
        inputDot()
      } else if (e.key === 'Enter' || e.key === '=') {
        handleEqual()
      } else if (e.key === 'Escape') {
        clearAll()
      } else if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
        performOperation(e.key)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [displayValue, handleEqual, inputDigit, inputDot, operator, performOperation])

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
        value={displayValue}
        InputProps={{ readOnly: true }}
        inputProps={{ style: { textAlign: 'right' } }}
        sx={{ mb: 2 }}
      />

      <Grid container spacing={1} mb={1}>
        <Grid item xs={3}>
          <CalculatorButton label="C" onClick={clearAll} color="info" />
        </Grid>
        <Grid item xs={3}>
          <CalculatorButton label="+-" onClick={toggleSign} color="info" />
        </Grid>
        <Grid item xs={3}>
          <CalculatorButton label="%" onClick={console.log} color="info" />
        </Grid>
        <Grid item xs={3}>
          <CalculatorButton label="/" onClick={() => performOperation('/')} color="secondary" />
        </Grid>
      </Grid>
      <Grid container spacing={1} mb={1}>
        <Grid item xs={3}>
          <CalculatorButton label="7" onClick={() => inputDigit(7)} />
        </Grid>
        <Grid item xs={3}>
          <CalculatorButton label="8" onClick={() => inputDigit(8)} />
        </Grid>
        <Grid item xs={3}>
          <CalculatorButton label="9" onClick={() => inputDigit(9)} />
        </Grid>
        <Grid item xs={3}>
          <CalculatorButton label="*" onClick={() => performOperation('*')} color="secondary" />
        </Grid>
      </Grid>
      <Grid container spacing={1} mb={1}>
        <Grid item xs={3}>
          <CalculatorButton label="4" onClick={() => inputDigit(4)} />
        </Grid>
        <Grid item xs={3}>
          <CalculatorButton label="5" onClick={() => inputDigit(5)} />
        </Grid>
        <Grid item xs={3}>
          <CalculatorButton label="6" onClick={() => inputDigit(6)} />
        </Grid>
        <Grid item xs={3}>
          <CalculatorButton label="-" onClick={() => performOperation('-')} color="secondary" />
        </Grid>
      </Grid>
      <Grid container spacing={1} mb={1}>
        <Grid item xs={3}>
          <CalculatorButton label="1" onClick={() => inputDigit(1)} />
        </Grid>
        <Grid item xs={3}>
          <CalculatorButton label="2" onClick={() => inputDigit(2)} />
        </Grid>
        <Grid item xs={3}>
          <CalculatorButton label="3" onClick={() => inputDigit(3)} />
        </Grid>
        <Grid item xs={3}>
          <CalculatorButton label="+" onClick={() => performOperation('+')} color="secondary" />
        </Grid>
      </Grid>
      <Grid container spacing={1} mb={2}>
        <Grid item xs={6}>
          <CalculatorButton label="0" onClick={() => inputDigit(0)} />
        </Grid>
        <Grid item xs={3}>
          <CalculatorButton label="." onClick={inputDot} />
        </Grid>
        <Grid item xs={3}>
          <CalculatorButton label="=" onClick={handleEqual} color="secondary" />
        </Grid>
      </Grid>
      <BottomToolbar
        displayValue={displayValue}
        firstOperand={firstOperand}
        secondOperand={secondOperand}
        operator={operator}
      />
    </Box>
  )
}
