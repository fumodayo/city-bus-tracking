import { Table, Modal, Input, Space } from 'antd'
import { useEffect, useState } from 'react'
import { EditOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons'
import DashBoard from '../DashBoard'
import { useFormik } from 'formik'
import {
  Box,
  Grid,
  InputLabel,
  MenuItem,
  TextareaAutosize,
  TextField,
  Typography,
  Select,
  Button
} from '@mui/material'
import * as Yup from 'yup'
import { useTravel } from 'hooks/useTravel'
import HTMLReactParser from 'html-react-parser'
import Resizer from 'react-image-file-resizer'
import { useRef } from 'react'
import Highlighter from 'react-highlight-words'
import danabus from 'danabus'

function Travels() {
  const [isEditing, setIsEditing] = useState(false)
  const [isAdd, setIsAdd] = useState(false)
  const [editingStudent, setEditingStudent] = useState(null)
  const [dataSource, setDataSource] = useState([])

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

  // Search in Column
  const [searchText, setSearchText] = useState('')
  const [searchedColumn, setSearchedColumn] = useState('')
  const searchInput = useRef(null)

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm()
    setSearchText(selectedKeys[0])
    setSearchedColumn(dataIndex)
  }

  const handleReset = clearFilters => {
    clearFilters()
    setSearchText('')
  }

  const getColumnSearchProps = dataIndex => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close
    }) => (
      <div style={{ padding: 8 }} onKeyDown={e => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false })
              setSearchText(selectedKeys[0])
              setSearchedColumn(dataIndex)
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close()
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: visible => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100)
      }
    },
    render: text =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      )
  })

  const travels = useTravel()
  useEffect(() => {
    setDataSource(travels)
  }, [travels])

  const formik = useFormik({
    initialValues: {
      title: '',
      typeLocation: 'discover',
      image: '',
      imageDesc: '',
      description: '',
      locationLink: '',
      locationName: '',
      location: {
        lat: '',
        lng: ''
      }
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .min(5, 'Tên địa điểm tối thiểu trên 5 kí tự!')
        .max(50, 'Tên địa điểm không được dài quá 50 kí tự!')
        .required('Phải điền tên địa điểm!'),
      typeLocation: Yup.string().required(),
      image: Yup.string().required(),
      imageDesc: Yup.string().max(100),
      description: Yup.string().max(1000, 'Mô tả không được dài quá!'),
      locationLink: Yup.string().max(
        255,
        'Địa chỉ không được dài quá 255 kí tự!'
      ),
      locationName: Yup.string().max(
        255,
        'Địa chỉ trên google map không được dài quá 255 kí tự!'
      ),
      location: Yup.object({
        lat: Yup.string()
          .min(3, 'Kinh độ tối thiểu trên 3 kí tự!')
          .max(12, 'Kinh độ không được dài quá 12 kí tự!')
          .required('Phải điền kinh độ địa điểm!'),
        lng: Yup.string()
          .min(3, 'Vĩ độ tối thiểu trên 3 kí tự!')
          .max(12, 'Vĩ độ không được dài quá 12 kí tự!')
          .required('Phải điền vĩ độ địa điểm!')
      })
    })
  })

  const editformik = useFormik({
    initialValues: {
      title: editingStudent?.title,
      locationName: editingStudent?.locationName,
      typeLocation: editingStudent?.typeLocation || 'discover',
      locationLink: editingStudent?.locationLink,
      location: {
        lat: editingStudent?.location?.lat,
        lng: editingStudent?.location?.lng
      },
      description: editingStudent?.description,
      image: editingStudent?.image
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      title: Yup.string()
        .min(5, 'Tên địa điểm tối thiểu trên 5 kí tự!')
        .max(50, 'Tên địa điểm không được dài quá 50 kí tự!')
        .required('Phải điền tên địa điểm!'),
      typeLocation: Yup.string().required(),
      image: Yup.string().required(),
      imageDesc: Yup.string().max(100),
      description: Yup.string().max(1000, 'Mô tả không được dài quá!'),
      locationLink: Yup.string().max(
        255,
        'Địa chỉ không được dài quá 255 kí tự!'
      ),
      locationName: Yup.string().max(
        255,
        'Địa chỉ trên google map không được dài quá 255 kí tự!'
      ),
      location: Yup.object({
        lat: Yup.string()
          .min(3, 'Kinh độ tối thiểu trên 3 kí tự!')
          .max(12, 'Kinh độ không được dài quá 12 kí tự!')
          .required('Phải điền kinh độ địa điểm!'),
        lng: Yup.string()
          .min(3, 'Vĩ độ tối thiểu trên 3 kí tự!')
          .max(12, 'Vĩ độ không được dài quá 12 kí tự!')
          .required('Phải điền vĩ độ địa điểm!')
      })
    })
  })

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

  const [newImage, setImage] = useState('')
  const convert2base64 = async e => {
    const file = e.target.files[0]
    const reader = await resizeFile(file)
    setImage(reader)
  }

  const columns = [
    {
      key: '1',
      title: 'ID',
      dataIndex: 'id',
      width: 100
    },
    {
      key: '2',
      title: 'Tên địa điểm',
      dataIndex: 'title',
      width: 150,
      ...getColumnSearchProps('title')
    },
    {
      key: '3',
      title: 'Địa chỉ',
      dataIndex: 'locationName',
      width: 150,
      ...getColumnSearchProps('locationName')
    },
    {
      key: '4',
      title: 'Hình ảnh',
      render: params => (
        <img
          style={{ maxWidth: '100%' }}
          src={params.image}
          alt={params.image}
        />
      ),
      width: 150
    },
    {
      key: '5',
      title: 'Loại Hình Du lịch',
      dataIndex: 'typeLocation',
      width: 150,
      filters: [
        { text: 'Địa điểm khám phá', value: 'discover' },
        { text: 'Địa điểm văn hóa', value: 'cultural' },
        { text: 'Địa điểm chụp ảnh', value: 'checking' },
        { text: 'Trung tâm vui chơi', value: 'center' },
        { text: 'Vui chơi về đêm', value: 'night' }
      ],
      filterMode: 'tree',
      filterSearch: true,
      onFilter: (value, record) => record.typeLocation.startsWith(value)
    },
    {
      key: '6',
      title: 'Địa chỉ trên google map',
      dataIndex: 'locationLink',
      width: 300
    },
    {
      key: '7',
      title: 'Mô tả địa điểm',
      render: params => (
        <Typography>{HTMLReactParser(params.description)}</Typography>
      ),
      width: 400
    },
    {
      key: '8',
      title: 'Kinh độ',
      render: params => <Typography>{params.location.lng}</Typography>
    },
    {
      key: '9',
      title: 'Vỹ độ',
      render: params => <Typography>{params.location.lat}</Typography>
    },
    {
      key: '10',
      title: 'Actions',
      render: record => {
        return (
          <>
            <EditOutlined
              onClick={() => {
                onEditStudent(record)
              }}
            />
            <DeleteOutlined
              onClick={() => {
                onDeleteStudent(record)
              }}
              style={{ color: 'red', marginLeft: 12 }}
            />
          </>
        )
      }
    }
  ]

  const onAddStudent = () => {
    const randomNumber = parseInt(Math.random() * 1000)
    const newStudent = {
      id: randomNumber,
      ...formik.values
    }
    setDataSource(pre => {
      return [newStudent, ...pre]
    })
    setIsAdd(false)
  }

  const onDeleteStudent = record => {
    Modal.confirm({
      title: 'Bạn có muốn xóa trạm xe bạn đã chọn?',
      okText: 'Có',
      okType: 'danger',
      onOk: () => {
        setDataSource(pre => {
          return pre.filter(student => student.id !== record.id)
        })
      }
    })
  }
  const onEditStudent = record => {
    setIsEditing(true)
    setEditingStudent({ ...record })
  }
  const resetEditing = () => {
    setIsEditing(false)
    setIsAdd(false)
    setEditingStudent(null)
  }

  useEffect(() => {
    const data = {
      ...travels,
      image: newImage
    }
    setEditingStudent(data)
  }, [newImage])

  const handleSubmit = async () => {
    setShowModal(true)
    console.log(dataSource)
  }
  const [showModal, setShowModal] = useState(false)

  return (
    <DashBoard>
      <Modal
        title="Bạn có chắc với hành động này?"
        open={showModal}
        okText="Thay đổi"
        cancelText="Hủy"
        onCancel={() => setShowModal(false)}
        onOk={async () => {
          await danabus.createManyTravels(dataSource)
          setShowModal(false)
        }}
      />
      <Box style={{ display: 'flex', gap: '20px', paddingBottom: '10px' }}>
        <Button variant="contained" onClick={() => setIsAdd(true)}>
          Thêm trạm địa điểm du lịch mới
        </Button>
        <Button variant="contained" onClick={handleSubmit}>
          Xác nhận tạo địa điểm du lịch{' '}
        </Button>
      </Box>
      <Table
        columns={columns}
        dataSource={dataSource}
        scroll={{ x: 1500, y: 600 }}
      />
      <Modal
        title="Thêm địa điểm du lịch mới"
        open={isAdd}
        okText="Thêm mới"
        cancelText="Hủy"
        onCancel={() => {
          resetEditing()
        }}
        onOk={() => onAddStudent()}
        width="1200px"
      >
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              autoFocus
              id="title"
              name="title"
              type="text"
              label="Tên địa điểm"
              value={formik.values.title}
              onChange={formik.handleChange}
              error={formik.touched.title || Boolean(formik.errors.title)}
              helperText={formik.errors.title}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ minWidth: 200 }}>
              <InputLabel>Loại Hình Du lịch</InputLabel>
              <Select
                id="typeLocation"
                name="typeLocation"
                value={formik.values.typeLocation}
                onChange={formik.handleChange}
              >
                <MenuItem value={'discover'}>Khám phá</MenuItem>
                <MenuItem value={'cultural'}>Văn hóa</MenuItem>
                <MenuItem value={'checking'}>Chụp ảnh</MenuItem>
                <MenuItem value={'center'}>Trung tâm vui chơi</MenuItem>
                <MenuItem value={'night'}>Vui chơi về đêm</MenuItem>
              </Select>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="locationName"
              name="locationName"
              type="text"
              label="Địa chỉ"
              value={formik.values.locationName}
              onChange={formik.handleChange}
              error={
                formik.touched.locationName ||
                Boolean(formik.errors.locationName)
              }
              helperText={formik.errors.locationName}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="locationLink"
              name="locationLink"
              type="text"
              label="Địa chỉ trên google map"
              value={formik.values.locationLink}
              onChange={formik.handleChange}
              error={
                formik.touched.locationLink ||
                Boolean(formik.errors.locationLink)
              }
              helperText={formik.errors.locationLink}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputLabel>Toạ độ của địa điểm:</InputLabel>
            <TextField
              id="location.lng"
              name="location.lng"
              label="Kinh độ"
              type="number"
              value={formik.values.location.lng}
              onChange={formik.handleChange}
              error={
                formik.touched.location?.lng ||
                Boolean(formik.errors.location?.lng)
              }
              helperText={formik.errors.location?.lng}
            />
            <TextField
              id="location.lat"
              name="location.lat"
              label="Vĩ độ"
              type="number"
              value={formik.values.location.lat}
              onChange={formik.handleChange}
              error={
                formik.touched.location?.lat ||
                Boolean(formik.errors.location?.lat)
              }
              helperText={formik.errors.location?.lat}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputLabel>Mô tả về địa điểm: </InputLabel>
            <TextareaAutosize
              style={{ width: 500, height: 200 }}
              id="description"
              name="description"
              type="number"
              value={formik.description}
              onChange={formik.handleChange}
              error={
                formik.touched.description || Boolean(formik.errors.description)
              }
              helperText={formik.errors.description}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography
              style={{
                fontSize: '18px',
                fontWeight: 'bold',
                padding: '5px 0 5px 0'
              }}
            >
              Hình ảnh địa điểm
            </Typography>
            <Box>
              {newImage && (
                <img
                  style={{
                    width: '300px',
                    height: '300px',
                    border: '3px solid #333333',
                    boxShadow:
                      '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
                  }}
                  src={newImage}
                  alt={'test'}
                />
              )}
            </Box>
            <Box sx={{ padding: '20px 0 20px 0' }}>
              <Button
                variant="contained"
                component="label"
                sx={{ fontWeight: 'bold' }}
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
            </Box>
          </Grid>
        </Grid>
      </Modal>

      <Modal
        title="Sửa thông tin trạm xe buýt"
        open={isEditing}
        okText="Lưu lại"
        cancelText="Hủy"
        width="1200px"
        onCancel={() => {
          resetEditing()
        }}
        onOk={() => {
          setDataSource(pre => {
            return pre.map(student => {
              if (student.id === editingStudent.id) {
                return editformik.values
              } else {
                return student
              }
            })
          })
          resetEditing()
        }}
      >
        <Grid container spacing={2} columns={16}>
          <Grid
            item
            xs={8}
            style={{ display: 'flex', flexDirection: 'column' }}
          >
            {editformik.values.image && (
              <img
                style={{
                  width: '300px',
                  height: '300px',
                  border: '3px solid #333333',
                  boxShadow:
                    '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
                }}
                src={editformik.values.image}
                alt={editformik.values.image}
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
              <TextField
                id="title"
                name="title"
                type="text"
                style={{ width: 300 }}
                value={editformik.values?.title}
                onChange={editformik.handleChange}
                error={
                  editformik.touched?.title || Boolean(editformik.errors?.title)
                }
                helperText={editformik.errors?.title}
              />
            </Box>
            <Box>
              <Typography style={{ fontWeight: 'bold' }}>Địa chỉ:</Typography>
              <TextField
                id="locationName"
                name="locationName"
                type="text"
                style={{ width: 300 }}
                value={editformik.values.locationName}
                onChange={editformik.handleChange}
                error={
                  editformik.touched.locationName ||
                  Boolean(editformik.errors.locationName)
                }
                helperText={editformik.errors.locationName}
              />
            </Box>
            <Box>
              <Typography style={{ fontWeight: 'bold' }}>
                Loại Hình Du lịch
              </Typography>
              <Select
                id="typeLocation"
                name="typeLocation"
                value={editformik.values.typeLocation}
                onChange={editformik.handleChange}
              >
                <MenuItem value={'discover'}>Khám phá</MenuItem>
                <MenuItem value={'cultural'}>Văn hóa</MenuItem>
                <MenuItem value={'checking'}>Chụp ảnh</MenuItem>
                <MenuItem value={'center'}>Trung tâm vui chơi</MenuItem>
                <MenuItem value={'night'}>Vui chơi về đêm</MenuItem>
              </Select>
            </Box>
            <Box>
              <Typography style={{ fontWeight: 'bold' }}>
                Địa chỉ trên google map
              </Typography>

              <TextField
                id="locationLink"
                name="locationLink"
                type="text"
                value={editformik.values.locationLink}
                onChange={editformik.handleChange}
                error={
                  editformik.touched.locationLink ||
                  Boolean(editformik.errors.locationLink)
                }
                helperText={editformik.errors.locationLink}
              />
            </Box>
            <Box>
              <Typography style={{ fontWeight: 'bold' }}>
                Mô tả về địa điểm:
              </Typography>
              <TextareaAutosize
                id="description"
                name="description"
                type="text"
                style={{ width: 500, height: 200 }}
                value={editformik.values.description}
                onChange={editformik.handleChange}
                error={
                  editformik.touched.description ||
                  Boolean(editformik.errors.description)
                }
                helperText={editformik.errors.description}
              />
            </Box>
            <Box>
              <Typography style={{ fontWeight: 'bold' }}>
                Toạ độ địa điểm:
              </Typography>
              <Box>
                <Typography style={{ fontWeight: 'bold' }}>Kinh độ:</Typography>
                <TextField
                  id="location.lng"
                  name="location.lng"
                  type="number"
                  value={editformik.values.location.lng}
                  onChange={editformik.handleChange}
                  error={
                    editformik.touched.location?.lng ||
                    Boolean(editformik.errors.location?.lng)
                  }
                  helperText={editformik.errors.location?.lng}
                />
                <Typography style={{ fontWeight: 'bold' }}>Vĩ độ:</Typography>
                <TextField
                  id="location.lat"
                  name="location.lat"
                  type="number"
                  value={editformik.values.location.lat}
                  onChange={editformik.handleChange}
                  error={
                    editformik.touched.location?.lat ||
                    Boolean(editformik.errors.location?.lat)
                  }
                  helperText={editformik.errors.location?.lat}
                />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Modal>
    </DashBoard>
  )
}

export default Travels
