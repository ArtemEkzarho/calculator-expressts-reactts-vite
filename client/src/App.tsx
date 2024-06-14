import { useState } from 'react'
import { Button, TextField, Box, Grid } from '@mui/material'

import { evaluate } from 'mathjs'

export const App = () => {
  const [input, setInput] = useState<string>('')

  const handleNumberClick = (number: string) => setInput(input + number)
  const handleClear = () => setInput('')
  const handleDelete = () => setInput(input.slice(0, -1))
  const handleOperator = (operator: string) => setInput(input + operator)
  const handleCalculate = () => {
    try {
      const result = evaluate(input)
      setInput(String(result))
    } catch (error) {
      setInput('Error')
    }
  }
  const handlePlusMinus = () => setInput(input.startsWith('-') ? input.slice(1) : '-' + input)
  const handleDot = () => setInput(input.includes('.') ? input : input + '.')

  return (
    <Box sx={{ minWidth: 320, maxWidth: 400, m: 'auto', p: 2 }}>
      <TextField
        fullWidth
        variant="outlined"
        value={input}
        InputProps={{ readOnly: true }}
        inputProps={{ style: { textAlign: 'right' } }}
        sx={{ mb: 2, backgroundColor: 'background.paper' }}
      />
      <Grid container spacing={1}>
        <Grid item xs={3}>
          <Button fullWidth variant="outlined" onClick={() => setInput('')}>
            ce
          </Button>
        </Grid>
        <Grid item xs={3}>
          <Button fullWidth variant="outlined" onClick={handleClear}>
            c
          </Button>
        </Grid>
        <Grid item xs={3}>
          <Button fullWidth variant="outlined" onClick={handleDelete}>
            del
          </Button>
        </Grid>
        <Grid item xs={3}>
          <Button fullWidth variant="outlined" onClick={() => handleOperator('/')}>
            /
          </Button>
        </Grid>

        {/* Row for 7, 8, 9, * */}
        {['7', '8', '9'].map((number) => (
          <Grid item xs={3} key={number}>
            <Button fullWidth variant="contained" onClick={() => handleNumberClick(number)}>
              {number}
            </Button>
          </Grid>
        ))}
        <Grid item xs={3}>
          <Button fullWidth variant="contained" onClick={() => handleOperator('*')}>
            *
          </Button>
        </Grid>

        {/* Row for 4, 5, 6, - */}
        {['4', '5', '6'].map((number) => (
          <Grid item xs={3} key={number}>
            <Button fullWidth variant="contained" onClick={() => handleNumberClick(number)}>
              {number}
            </Button>
          </Grid>
        ))}
        <Grid item xs={3}>
          <Button fullWidth variant="contained" onClick={() => handleOperator('-')}>
            -
          </Button>
        </Grid>

        {/* Row for 1, 2, 3, + */}
        {['1', '2', '3'].map((number) => (
          <Grid item xs={3} key={number}>
            <Button fullWidth variant="contained" onClick={() => handleNumberClick(number)}>
              {number}
            </Button>
          </Grid>
        ))}
        <Grid item xs={3}>
          <Button fullWidth variant="contained" onClick={() => handleOperator('+')}>
            +
          </Button>
        </Grid>

        {/* Row for +-, 0, ., = */}
        <Grid item xs={3}>
          <Button fullWidth variant="contained" onClick={handlePlusMinus}>
            +-
          </Button>
        </Grid>
        <Grid item xs={3}>
          <Button fullWidth variant="contained" onClick={() => handleNumberClick('0')}>
            0
          </Button>
        </Grid>
        <Grid item xs={3}>
          <Button fullWidth variant="contained" onClick={handleDot}>
            .
          </Button>
        </Grid>
        <Grid item xs={3}>
          <Button fullWidth variant="contained" onClick={handleCalculate}>
            =
          </Button>
        </Grid>
      </Grid>
    </Box>
  )
}
