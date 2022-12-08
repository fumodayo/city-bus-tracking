import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Button } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { useTravel } from 'hooks/useTravel'

const Travels = ({ setSelectedLink, link }) => {
  useEffect(() => {
    setSelectedLink(link)
  }, [])

  const navigate = useNavigate()

  const rows = useTravel()

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'title',
      headerName: 'Tên địa điểm',
      width: 200,
      editable: true
    },
    {
      field: 'typeLocation',
      headerName: 'Loại Hình Du lịch',
      width: 150,
      editable: true
    },
    {
      field: 'image',
      headerName: 'Hình ảnh',
      width: 150,
      editable: true,
      renderCell: params => (
        <img style={{ maxWidth: '100%' }} src={params.value} alt={params} />
      )
    },
    {
      field: 'description',
      headerName: 'Mô tả hành trình',
      width: 300,
      editable: true
    },
    {
      field: 'locationLink',
      headerName: 'Địa chỉ trên google map',
      width: 250,
      editable: true
    },
    {
      field: 'locationName',
      headerName: 'Địa chỉ',
      width: 350,
      editable: true
    },
    {
      field: 'location',
      headerName: 'Kinh độ',
      type: 'string',
      width: 200,
      editable: true,
      renderCell: params => params.formattedValue.lng
    }
  ]

  return (
    <div>
      <Box sx={{ height: 800, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={15}
          rowsPerPageOptions={[20]}
          checkboxSelection
          disableSelectionOnClick
          experimentalFeatures={{ newEditingApi: true }}
        />
      </Box>
      <Button onClick={() => navigate('/dashboard/createTravels')}>
        Create Travels
      </Button>
    </div>
  )
}

export default Travels
