import React, { useState, useEffect } from 'react'
import {
  Box,
  Button,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography
} from '@mui/material'
import { useTravel } from 'hooks/useTravel'
import { useParams } from 'react-router-dom'
import Resizer from 'react-image-file-resizer'
import { Send } from '@mui/icons-material'
import {
  RichTextEditorComponent,
  Toolbar,
  Link,
  Table,
  QuickToolbar,
  Image,
  HtmlEditor,
  Inject
} from '@syncfusion/ej2-react-richtexteditor'

const EditTravels = () => {
  let { travelId } = useParams()
  const dataTravels = useTravel()
  const [travels, setTravels] = useState([])

  const [toggleChangeInput, setToggleChangeInput] = useState(true)

  const handleChangeInput = () => {
    setToggleChangeInput(false)
  }

  useEffect(() => {
    const findDataWithID = dataTravels.find(i => i.id === travelId)
    setTravels(findDataWithID)
  }, [travelId, dataTravels])

  // resize image base64 to (250x250)
  const resizeFile = file =>
    new Promise(resolve => {
      Resizer.imageFileResizer(
        file,
        250,
        250,
        'JPEG',
        100,
        0,
        uri => {
          resolve(uri)
        },
        'base64'
      )
    })

  const [image, setImage] = useState('')
  const convert2base64 = async e => {
    const file = e.target.files[0]
    const reader = await resizeFile(file)
    setImage(reader)
  }

  useEffect(() => {
    console.log({ image: image })
    setTravels({ image: image })
  }, [image])

  const handleSubmit = () => {
    console.log(travels)
  }

  const updatedFormTravels = fields => {
    setTravels(newData => {
      return { ...newData, ...fields }
    })
  }

  const switchTypeLocation = type => {
    switch (type) {
      case 'discover':
        type = 'Khám phá'
        break
      case 'cultural':
        type = 'Văn hóa'
        break
      case 'checking':
        type = 'Chụp ảnh'
        break
      case 'center':
        type = 'Trung tâm vui chơi'
        break
      case 'night':
        type = 'Vui chơi về đêm'
        break
      default:
        type = null
    }
    return type
  }

  return (
    <Box>
      <Typography style={{ fontSize: '20px', fontWeight: 'bold' }}>
        Chỉnh sửa địa điểm du lịch
      </Typography>
      <Box>
        {travels && (
          <Grid container spacing={2} columns={16}>
            <Grid
              item
              xs={8}
              style={{ display: 'flex', flexDirection: 'column' }}
            >
              {travels.image && (
                <img
                  style={{
                    width: '300px',
                    height: '300px',
                    border: '3px solid #333333',
                    boxShadow:
                      '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
                  }}
                  src={travels.image}
                  alt={travels.image}
                />
              )}
              <Button
                variant="contained"
                component="label"
                sx={{ fontWeight: 'bold', width: 200 }}
              >
                Tải hình ảnh lên
                <input
                  hidden
                  accept="image/*"
                  multiple
                  type="file"
                  onChange={convert2base64}
                />
              </Button>
            </Grid>
            <Grid item xs={8}>
              <Box>
                <Typography style={{ fontWeight: 'bold' }}>
                  Tên địa điểm:
                </Typography>
                {toggleChangeInput ? (
                  <Typography onDoubleClick={handleChangeInput}>
                    {travels.title}
                  </Typography>
                ) : (
                  <TextField
                    style={{ width: 300 }}
                    value={travels.title}
                    type="text"
                    onChange={e =>
                      updatedFormTravels({ title: e.target.value })
                    }
                  />
                )}
              </Box>
              <Box>
                <Typography style={{ fontWeight: 'bold' }}>Địa chỉ:</Typography>
                {toggleChangeInput ? (
                  <Typography onDoubleClick={handleChangeInput}>
                    {travels.locationName}
                  </Typography>
                ) : (
                  <TextField
                    style={{ width: 300 }}
                    value={travels.locationName}
                    type="text"
                    onChange={e =>
                      updatedFormTravels({ locationName: e.target.value })
                    }
                  />
                )}
              </Box>
              <Box>
                <Typography style={{ fontWeight: 'bold' }}>
                  Loại Hình Du lịch
                </Typography>
                {toggleChangeInput ? (
                  <Typography onDoubleClick={handleChangeInput}>
                    {travels?.typeLocation &&
                      switchTypeLocation(travels.typeLocation)}
                  </Typography>
                ) : (
                  <Select
                    value={travels.typeLocation}
                    onChange={e =>
                      updatedFormTravels({ typeLocation: e.target.value })
                    }
                  >
                    <MenuItem value={'discover'}>Khám phá</MenuItem>
                    <MenuItem value={'cultural'}>Văn hóa</MenuItem>
                    <MenuItem value={'checking'}>Chụp ảnh</MenuItem>
                    <MenuItem value={'center'}>Trung tâm vui chơi</MenuItem>
                    <MenuItem value={'night'}>Vui chơi về đêm</MenuItem>
                  </Select>
                )}
              </Box>
              <Box>
                <Typography style={{ fontWeight: 'bold' }}>
                  Địa chỉ trên google map
                </Typography>
                {toggleChangeInput ? (
                  <Typography
                    onDoubleClick={handleChangeInput}
                    style={{
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}
                  >
                    {travels.locationLink}
                  </Typography>
                ) : (
                  <TextField
                    value={travels.locationLink}
                    style={{ width: 300 }}
                    type="text"
                    onChange={e =>
                      updatedFormTravels({ locationLink: e.target.value })
                    }
                  />
                )}
              </Box>
              <Box>
                <Typography style={{ fontWeight: 'bold' }}>
                  Mô tả về địa điểm:
                </Typography>
                {toggleChangeInput ? (
                  <Typography
                    onDoubleClick={handleChangeInput}
                    style={{
                      wordWrap: 'break-word'
                    }}
                  >
                    {travels.description}
                  </Typography>
                ) : (
                  <RichTextEditorComponent>
                    <p>{travels.description}</p>
                    <Inject
                      services={[Toolbar, Link, Image, HtmlEditor, Table]}
                    ></Inject>
                  </RichTextEditorComponent>
                )}
              </Box>
              <Box>
                <Typography style={{ fontWeight: 'bold' }}>
                  Toạ độ địa điểm:
                </Typography>
                <Box>
                  <Typography style={{ fontWeight: 'bold' }}>
                    Kinh độ:
                  </Typography>
                  {toggleChangeInput ? (
                    <Typography
                      onDoubleClick={handleChangeInput}
                      style={{
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}
                    >
                      {travels.location?.lat}
                    </Typography>
                  ) : (
                    <TextField
                      value={travels.location?.lat}
                      style={{ width: 300 }}
                      type="text"
                      onChange={e =>
                        updatedFormTravels({
                          location: { lat: e.target.value }
                        })
                      }
                    />
                  )}
                  <Typography style={{ fontWeight: 'bold' }}>Vĩ độ:</Typography>
                  {toggleChangeInput ? (
                    <Typography
                      onDoubleClick={handleChangeInput}
                      style={{
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}
                    >
                      {travels.location?.lng}
                    </Typography>
                  ) : (
                    <TextField
                      value={travels.location?.lng}
                      style={{ width: 300 }}
                      type="text"
                      onChange={e =>
                        updatedFormTravels({
                          location: { lng: e.target.value }
                        })
                      }
                    />
                  )}
                </Box>
              </Box>
            </Grid>
          </Grid>
        )}
      </Box>
      <Button variant="contained" endIcon={<Send />} onClick={handleSubmit}>
        Chỉnh sửa
      </Button>
    </Box>
  )
}

export default EditTravels
