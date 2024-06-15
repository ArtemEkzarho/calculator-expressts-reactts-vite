import { Button, ButtonProps } from '@mui/material'

interface Props extends ButtonProps {
  label: string
  onClick: () => void
}

export const CalculatorButton = ({ label, onClick, ...props }: Props) => {
  return (
    <Button fullWidth variant="contained" onClick={onClick} {...props} size="large">
      {label}
    </Button>
  )
}

export default CalculatorButton
