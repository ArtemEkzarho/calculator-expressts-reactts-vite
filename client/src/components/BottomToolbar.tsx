import { useState } from 'react'
import { Grid, FormControlLabel, Typography, Tooltip, Checkbox, IconButton } from '@mui/material'
import { GitHub } from '@mui/icons-material'

type Props = {
  displayValue: string
  firstOperand: number | null
  secondOperand: number | null
  operator: string | null
}

export const BottomToolbar = ({ displayValue, firstOperand, secondOperand, operator }: Props) => {
  const [showState, setShowState] = useState(false)

  return (
    <>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <FormControlLabel
            control={
              <Checkbox value={showState} onChange={(_e, checked) => setShowState(checked)} />
            }
            label={<Typography variant="body2">Show state</Typography>}
          />
        </Grid>
        <Grid item>
          <Tooltip title="GitHub repository">
            <IconButton
              size="small"
              target="_blank"
              href="https://github.com/ArtemEkzarho/calculator-expressts-reactts-vite"
            >
              <GitHub />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
      {showState && (
        <>
          <Typography variant="body2">display value: {displayValue}</Typography>
          <Typography variant="body2">first operand: {firstOperand}</Typography>
          <Typography variant="body2">second operand: {secondOperand}</Typography>
          <Typography variant="body2">operator: {operator}</Typography>
        </>
      )}
    </>
  )
}
