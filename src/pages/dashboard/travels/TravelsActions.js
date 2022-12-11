import React, { useState } from 'react'
import { Box, CircularProgress, Fab, IconButton, Tooltip } from '@mui/material'
import { Check, Delete, Preview, Save } from '@mui/icons-material'
import { green } from '@mui/material/colors'
import { useTravel } from 'hooks/useTravel'
import { useEffect } from 'react'

const TravelsActions = ({ params, rowId, setRowId }) => {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const travels = useTravel()
  const handleSubmit = async () => {
    setLoading(true)
    setTimeout(async () => {
      const result = await travels
      if (result) {
        setSuccess(true)
        setRowId(null)
      }
      setLoading(false)
    }, 1500)
  }

  useEffect(() => {
    if (rowId === params.id && success) setSuccess(false)
  }, [rowId])

  return (
    <Box style={{ display: 'flex' }}>
      <Tooltip title="Cap nhat">
        <Box
          sx={{
            m: 1,
            position: 'relative'
          }}
        >
          {success ? (
            <Fab
              color="primary"
              sx={{
                width: 40,
                height: 40,
                bgcolor: green[500],
                '&:hover': { bgcolor: green[700] }
              }}
            >
              <Check />
            </Fab>
          ) : (
            <Fab
              color="primary"
              sx={{
                width: 40,
                height: 40
              }}
              disabled={params.id !== rowId || loading}
              onClick={handleSubmit}
            >
              <Save />
            </Fab>
          )}
          {loading && (
            <CircularProgress
              size={52}
              sx={{
                color: green[500],
                position: 'absolute',
                top: -6,
                left: -6,
                zIndex: 1
              }}
            />
          )}
        </Box>
      </Tooltip>
      <Tooltip title="Xoa">
        <IconButton>
          <Delete />
        </IconButton>
      </Tooltip>
    </Box>
  )
}

export default TravelsActions
