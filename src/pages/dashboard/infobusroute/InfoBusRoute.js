import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Button } from '@mui/material'
import { useFormatInfo } from 'hooks/useFormatInfo'
import { DataGrid } from '@mui/x-data-grid'
import { informationBusRouteData } from 'actions/initialData/informationBusRouteData'

const columns = [
  {
    field: 'ticketPrice',
    headerName: 'Mã số tuyến',
    width: 150,
    editable: true
  },
  {
    field: 'busName',
    headerName: 'Tên tuyến',
    width: 300,
    editable: true
  },
  {
    field: 'busCapacity',
    headerName: 'Chiều của tuyến',
    width: 150,
    editable: true
  },
  {
    field: 'busOperation',
    headerName: 'Mô tả hành trình',
    width: 300,
    editable: true
  }
]

const InfoBusRoute = ({ setSelectedLink, link }) => {
  useEffect(() => {
    setSelectedLink(link)
  }, [])

  const navigate = useNavigate()

  const rows = informationBusRouteData
  
  return (
    <div>
      <Box sx={{ height: 800, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={20}
          rowsPerPageOptions={[20]}
          checkboxSelection
          disableSelectionOnClick
          experimentalFeatures={{ newEditingApi: true }}
        />
      </Box>
      <Button onClick={() => navigate('/dashboard/createInfoBusRoute')}>
        Create InfoBusRoute
      </Button>
    </div>
  )
}

export default InfoBusRoute
