import React, { useState } from 'react'
import styled from 'styled-components'
import useInput from 'hooks/useInput'
import { InputBase } from '@mui/material'
import { useDispatch } from 'react-redux'
import { searchLocationOnInput } from 'redux/actions'

const InputField = ({ placeholder }) => {
  const address = useInput('')
  const [location, setLocation] = useState([])
  const dispatch = useDispatch()
  dispatch(searchLocationOnInput(location))

  return (
    <>
      <InputBase
        placeholder={placeholder}
        {...address}
        isTyping={address.value !== ''}
        sx={{ ml: 1, flex: 1 }}
      />
      {address.suggestions?.length > 0 && (
        <SuggestionWrapper>
          {address.suggestions.map((suggestion, index) => {
            return (
              <Suggestion
                key={index}
                onClick={() => {
                  address.setValue(suggestion.place_name)
                  address.setSuggestions([])
                  setLocation(suggestion.center)
                }}
              >
                {suggestion.place_name}
              </Suggestion>
            )
          })}
        </SuggestionWrapper>
      )}
    </>
  )
}

export default InputField

const SuggestionWrapper = styled.div`
  background: #fff;
  position: absolute;
  border-radius: '15px';
  box-shadow: 0px 0px 7px 2px rgb(0 0 0 / 15%);
  left: 0px;
  max-width: 320px;
  min-width: 320px;
  padding: 10px 20px;
  border-radius: 0px 0px 10px 10px;
  z-index: 1000;
`

const Suggestion = styled.p`
  cursor: pointer;
  max-width: 300px;
  min-width: 300px;
  font-size: 14.5px;
  display: block;
  text-overflow: ellipsis;
`
