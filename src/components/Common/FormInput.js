import React, { useState } from 'react'
import { InputBase } from '@mui/material'

const FormInput = props => {
  const [inputType] = useState(props.type)
  const [inputPlaceHolder] = useState(props.placeholder)
  const [inputValue, setInputValue] = useState('')

  const handleChange = e => {
    setInputValue(e.target.value)
    if (props.onChange) props.onChange(inputValue)
  }

  return (
    <InputBase
      sx={{ ml: 1, flex: 1 }}
      placeholder={inputPlaceHolder}
      inputProps={{ 'aria-label': 'Tìm tuyến xe buýt' }}
      value={inputValue}
      onChange={handleChange}
      type={inputType}
      className="input-class"
      name="input-form"
    />
  )
}

export default FormInput
