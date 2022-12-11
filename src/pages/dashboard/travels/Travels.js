import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Button, IconButton } from '@mui/material'
import {
  DataGrid,
  GridFooter,
  GridFooterContainer,
  gridClasses
} from '@mui/x-data-grid'
import { useTravel } from 'hooks/useTravel'
import { Delete } from '@mui/icons-material'
import { grey } from '@mui/material/colors'
import TravelsActions from './TravelsActions'
import { useMemo } from 'react'
import moment from 'moment/moment'

const Travels = ({ setSelectedLink, link }) => {
  useEffect(() => {
    setSelectedLink(link)
  }, [])

  const navigate = useNavigate()

  const [rowId, setRowId] = useState('')
  const columns = useMemo(
    () => [
      { field: 'id', headerName: 'ID', width: 90 },
      {
        field: 'title',
        headerName: 'Tên địa điểm',
        width: 150,
        editable: true
      },
      {
        field: 'typeLocation',
        headerName: 'Loại Hình Du lịch',
        width: 150,
        type: 'singleSelect',
        valueOptions: ['discover', 'cultural', 'checking', 'center', 'night'],
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
        width: 200,
        editable: true
      },
      {
        field: 'locationLink',
        headerName: 'Địa chỉ trên google map',
        width: 200,
        editable: true
      },
      {
        field: 'locationName',
        headerName: 'Địa chỉ',
        width: 250,
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
      },
      {
        field: 'createdAt',
        headerName: 'Tạo vào lúc',
        width: 200,
        renderCell: params =>
          moment(params.row.createdAt).format('YYYY-MM-DD HH:MM:SS')
      },
      {
        field: 'actions',
        headerName: 'Actions',
        type: 'actions',
        renderCell: params => (
          <TravelsActions {...{ params, rowId, setRowId }} />
        )
      }
    ],
    [rowId]
  )

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

  const [pageSize, setPageSize] = useState(5)
  // console.log(selectedRows)

  return (
    <div>
      <Box sx={{ height: 800, width: '100%' }}>
        <DataGrid
          columns={columns}
          rows={rows}
          rowsPerPageOptions={[5, 10, 20]}
          pageSize={pageSize}
          onPageSizeChange={newPageSize => setPageSize(newPageSize)}
          getRowSpacing={params => ({
            top: params.isFirstVisible ? 0 : 5,
            bottom: params.isLastVisible ? 0 : 5
          })}
          checkboxSelection
          components={{ Footer: CustomFooter }}
          sx={{
            [`& .${gridClasses.row}`]: {
              bgcolor: theme =>
                theme.palette.mode === 'light' ? grey[200] : grey[900]
            }
          }}
          onCellEditCommit={params => setRowId(params.id)}
        />
      </Box>
      <Button onClick={() => navigate('/dashboard/createTravels')}>
        Create Travels
      </Button>
    </div>
  )
}

export default Travels
