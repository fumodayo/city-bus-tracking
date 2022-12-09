import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Button, IconButton } from '@mui/material'
import { DataGrid, GridFooter, GridFooterContainer } from '@mui/x-data-grid'
import { useTravel } from 'hooks/useTravel'
import { Delete } from '@mui/icons-material'

const Travels = ({ setSelectedLink, link }) => {
  useEffect(() => {
    setSelectedLink(link)
  }, [])

  const navigate = useNavigate()

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
      headerName: 'Mô tả địa điểm',
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
      headerName: 'Tọa độ',
      type: 'string',
      width: 200,
      editable: true,
      renderCell: params => (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div>Kinh độ: {params.formattedValue.lng}</div>
          <div>Vĩ độ: {params.formattedValue.lat}</div>
        </div>
      )
    }
  ]

  const CustomFooter = () => {
    return (
      <GridFooterContainer>
        <GridFooter
          sx={{
            border: 'none'
          }}
        />
        <IconButton sx={{ p: 2 }} onClick={handleDeleteRows}>
          <Delete />
        </IconButton>
      </GridFooterContainer>
    )
  }

  const rows = useTravel()

  const [selectedRows, setSelectedRows] = useState([])
  const [travelsData, setTravelsData] = useState(rows)

  const handleDeleteRows = () => {
    const updatedData = rows.filter(row => !selectedRows.includes(row.id))
    setTravelsData(updatedData)
  }

  // console.log(travelsData)

  return (
    <div>
      <Box sx={{ height: 800, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={15}
          rowsPerPageOptions={[15]}
          checkboxSelection
          disableSelectionOnClick
          experimentalFeatures={{ newEditingApi: true }}
          onSelectionModelChange={row => setSelectedRows(row)}
          components={{ Footer: CustomFooter }}
          editMode
        />
      </Box>
      <Button onClick={() => navigate('/dashboard/createTravels')}>
        Create Travels
      </Button>
    </div>
  )
}

export default Travels
