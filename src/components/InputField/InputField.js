import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import useInput from 'hooks/useInput'
import { InputBase } from '@mui/material'
import { useDispatch } from 'react-redux'
import { setSearchLocation } from 'redux/slices/routes'

const InputField = ({ idInput, placeholder }) => {
  const address = useInput('')
  const [location, setLocation] = useState([])
  const dispatch = useDispatch()

  const [isOpen, setIsOpen] = useState(false)

  const inputRef = useRef()

  useEffect(() => {
    const handler = e => {
      if (!inputRef.current.contains(e.target)) setIsOpen(false)
    }
    document.addEventListener('mousedown', handler)

    return () => document.removeEventListener('mousedown', handler)
  })

  const [idDirection, setIdDirection] = useState('')
  const handleOpenSuggestion = e => {
    setIsOpen(!isOpen)
    setIdDirection(e.target.id)
  }

  // get begin & end input direction
  useEffect(() => {
    dispatch(setSearchLocation({ id: idDirection, location }))
  }, [idDirection, location])

  return (
    <div ref={inputRef}>
      <InputBase
        placeholder={placeholder}
        {...address}
        isTyping={address.value !== ''}
        sx={{ ml: 1, flex: 1 }}
        autoComplete="off"
        onClick={e => handleOpenSuggestion(e)}
        id={idInput}
      />
      {address.suggestions?.length > 0 && isOpen && (
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
    </div>
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
