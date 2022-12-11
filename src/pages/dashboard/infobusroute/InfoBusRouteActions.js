import React, { useState } from 'react'
import { Box, CircularProgress, Fab, Tooltip } from '@mui/material'
import { Check, Save } from '@mui/icons-material'
import { green } from '@mui/material/colors'
import { useFormatInfo } from 'hooks/useFormatInfo'

const InfoBusRouteActions = () => {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const rows = useFormatInfo()

  const handleSubmit = async () => {
    setLoading(true)
    setTimeout(async () => {
      const result = await rows
      if (result) {
        setSuccess(true)
      }
      setLoading(false)
    }, 1500)
  }

  return (
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
            disabled={rows.id || loading}
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
  )
}

export default InfoBusRouteActions
