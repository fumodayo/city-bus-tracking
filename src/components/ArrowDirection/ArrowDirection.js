import React from 'react'
import TurnLeftIcon from '@mui/icons-material/TurnLeft'
import StraightIcon from '@mui/icons-material/Straight'
import TurnRightIcon from '@mui/icons-material/TurnRight'

const ArrowDirection = ({ arrow }) => {
  let children = null
  switch (arrow) {
    case 'left':
      children = <TurnLeftIcon />
      break
    case 'right':
      children = <TurnRightIcon />
      break
    default:
      children = <StraightIcon />
  }
  return <>{children}</>
}

export default ArrowDirection
