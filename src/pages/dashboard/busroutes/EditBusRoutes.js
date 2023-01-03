import { useParams } from 'react-router-dom'
import { Button, Table, Modal, Typography } from 'antd'
import { useEffect, useRef, useState } from 'react'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import DashBoard from '../DashBoard'
import dragula from 'dragula'
import 'dragula/dist/dragula.css'
import { useBusStop } from 'hooks/useBusStop'
import { useFormik } from 'formik'
import {
  Box,
  Grid,
  FormControl,
  InputAdornment,
  TextField,
  Input,
  TextareaAutosize
} from '@mui/material'
import * as Yup from 'yup'
import mapboxgl from '!mapbox-gl' // eslint-disable-line import/no-webpack-loader-syntax
import { useBusRoutes } from 'hooks/useBusRoutes'
import danabus from 'danabus'
import { useRoad } from 'hooks/useRoad'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'

mapboxgl.accessToken =
  'pk.eyJ1IjoidGhhaXJ5byIsImEiOiJjbDc4OTMzNzkwN2ZzM3ZueXE0NWdyNHB0In0.G_TZ_zbzQ8T7512A44nK9g'

const EditBusRoutes = () => {
  let { busrouteId } = useParams()
  const roadMap = useRoad()
  const [roadBusRoute, setRoadBusRoute] = useState([])

  const [isEditing, setIsEditing] = useState(false)
  const [isAdd, setIsAdd] = useState(false)
  const [editingStudent, setEditingStudent] = useState(null)
  const busStops = useBusStop()
  const [dataSource, setDataSource] = useState([])
  const [directionMap, setDirectionMap] = useState([])
  const [popupMap, setPopupMap] = useState([])

  const mapContainer = useRef(null)
  const map = useRef(null)
  const [lng, setLng] = useState(108.20911851153426)
  const [lat, setLat] = useState(16.06045710530602)
  const [zoom, setZoom] = useState(12)

  useEffect(() => {
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom
    })

    map.current.on('load', () => {
      map.current.addSource('route', {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates: directionMap
          }
        }
      })
      map.current.addLayer({
        id: 'route',
        type: 'line',
        source: 'route',
        layout: {
          'line-join': 'round',
          'line-cap': 'round'
        },
        paint: {
          'line-color': '#8fbc8f',
          'line-width': 5
        }
      })

      // Points
      map.current.addSource('places', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: popupMap
        }
      })

      // Add a layer showing the places.
      map.current.addLayer({
        id: 'places',
        type: 'circle',
        source: 'places',
        paint: {
          'circle-color': '#4264fb',
          'circle-radius': 6,
          'circle-stroke-width': 2,
          'circle-stroke-color': '#ffffff'
        }
      })

      // Create a popup, but don't add it to the map yet.
      const popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false
      })

      map.current.on('mouseenter', 'places', e => {
        // Change the cursor style as a UI indicator.
        map.current.getCanvas().style.cursor = 'pointer'

        // Copy coordinates array.
        const coordinates = e.features[0].geometry.coordinates.slice()
        const description = e.features[0].properties.description

        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360
        }

        // Populate the popup and set its coordinates
        // based on the feature found.
        popup.setLngLat(coordinates).setHTML(description).addTo(map.current)
      })

      map.current.on('mouseleave', 'places', () => {
        map.current.getCanvas().style.cursor = ''
        popup.remove()
      })
    })
    map.current.on('mousemove', e => {
      document.getElementById('info').innerHTML =
        // `e.point` is the x, y coordinates of the `mousemove` event
        // relative to the top-left corner of the map.
        JSON.stringify(e.point) +
        '<br />' +
        // `e.lngLat` is the longitude, latitude geographical position of the event.
        JSON.stringify(e.lngLat.wrap())
    })
  }, [directionMap, popupMap])

  const formik = useFormik({
    initialValues: {
      nameBusStop: '',
      location: {
        lng: '',
        lat: ''
      },
      travelNear: '',
      travelTime: ''
    },
    validationSchema: Yup.object({
      nameBusStop: Yup.string()
        .min(3, 'Tên trạm xe buýt tối thiểu trên 3 kí tự!')
        .max(50, 'Tên trạm xe buýt không được dài quá 50 kí tự!')
        .required('Phải điền tên trạm xe buýt!'),
      location: Yup.object({
        lat: Yup.string()
          .min(3, 'Kinh độ tối thiểu trên 3 kí tự!')
          .max(30, 'Vĩ độ không được dài quá 30 kí tự!')
          .required('Phải điền kinh độ địa điểm!'),
        lng: Yup.string()
          .min(3, 'Vĩ độ tối thiểu trên 3 kí tự!')
          .max(30, 'Vĩ độ không được dài quá 30 kí tự!')
          .required('Phải điền vĩ độ địa điểm!')
      }),
      travelNear: Yup.string().required(
        'Phải điền địa điểm du lịch ở gần trạm!'
      ),
      travelTime: Yup.string().required(
        'Phải điền thời gian di chuyển giữa 2 trạm!'
      )
    })
  })

  const busroutes = useBusRoutes()
  const [busrouteParams, setBusRouteParams] = useState({})
  useEffect(() => {
    const busroute = busroutes.filter(br => br.id === busrouteId)
    setBusRouteParams(busroute)
    const dataFilter = busStops.filter(
      route =>
        route.codeBusRoute === busroute[0].codeBusRoute &&
        route.directionRoute === busroute[0].directionRoute
    )
    setDataSource(dataFilter)
  }, [busStops, busroutes, busrouteId])

  const columns = [
    {
      key: '1',
      title: 'ID',
      dataIndex: 'id'
    },
    {
      key: '2',
      title: 'Tên trạm xe buýt',
      dataIndex: 'nameBusStop'
    },
    {
      key: '3',
      title: 'Địa điểm du lịch ở gần trạm',
      dataIndex: 'travelNear'
    },
    {
      key: '4',
      title: 'Kinh độ',
      render: params => <Typography>{params.location?.lng}</Typography>
    },
    {
      key: '5',
      title: 'Vỹ độ',
      render: params => <Typography>{params.location?.lat}</Typography>
    },
    {
      key: '6',
      title: 'Thời gian di chuyển giữa 2 trạm',
      render: params => <Typography>{params.travelTime} phút</Typography>
    },
    {
      key: '7',
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

  const onAddStudent = async () => {
    const createNew = {
      codeBusRoute: busrouteParams[0].codeBusRoute,
      directionRoute: busrouteParams[0].directionRoute,
      ...formik.values
    }
    await danabus.createOneBusStop(createNew)
    setDataSource(dataSource)
    setIsAdd(false)
  }

  const onDeleteStudent = async record => {
    await danabus.removeBusStop(record.id)
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

  const onEditStudent = async record => {
    setIsEditing(true)
    await danabus.updatedBusStop(record.id)
    setEditingStudent({ ...record })
  }
  const resetEditing = () => {
    setIsEditing(false)
    setIsAdd(false)
    setEditingStudent(null)
  }

  const getIndexInParent = el => Array.from(el.parentNode.children).indexOf(el)

  const handleReorder = (dragIndex, draggedIndex) => {
    setDataSource(oldState => {
      const newState = [...oldState]
      const item = newState.splice(dragIndex, 1)[0]
      newState.splice(draggedIndex, 0, item)
      return newState
    })
  }

  useEffect(() => {
    let start
    let end
    const container = document.querySelector('.ant-table-tbody')
    const drake = dragula([container], {
      moves: el => {
        start = getIndexInParent(el)
        return true
      }
    })

    drake.on('drop', el => {
      end = getIndexInParent(el)
      handleReorder(start, end)
    })
  }, [])

  const editformik = useFormik({
    initialValues: {
      nameBusStop: editingStudent?.nameBusStop,
      location: {
        lng: editingStudent?.location?.lng,
        lat: editingStudent?.location?.lat
      },
      travelNear: editingStudent?.travelNear,
      travelTime: editingStudent?.travelTime
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      nameBusStop: Yup.string()
        .min(3, 'Tên trạm xe buýt tối thiểu trên 3 kí tự!')
        .max(50, 'Tên trạm xe buýt không được dài quá 50 kí tự!')
        .required('Phải điền tên trạm xe buýt!'),
      location: Yup.object({
        lat: Yup.string()
          .min(3, 'Kinh độ tối thiểu trên 3 kí tự!')
          .max(30, 'Vĩ độ không được dài quá 30 kí tự!')
          .required('Phải điền kinh độ địa điểm!'),
        lng: Yup.string()
          .min(3, 'Vĩ độ tối thiểu trên 3 kí tự!')
          .max(30, 'Vĩ độ không được dài quá 30 kí tự!')
          .required('Phải điền vĩ độ địa điểm!')
      }),
      travelNear: Yup.string().required(
        'Phải điền địa điểm du lịch ở gần trạm!'
      ),
      travelTime: Yup.string().required(
        'Phải điền thời gian di chuyển giữa 2 trạm!'
      )
    }),
    onSubmit: values => {
      console.log(values)
    }
  })

  const handleArtLine = () => {
    const dir = dataSource.map(i => Object.values(i.location))
    setDirectionMap(dir)

    let popup = []
    popup = dataSource.map(i => ({
      type: 'Feature',
      properties: {
        description: i.nameBusStop
      },
      geometry: {
        type: 'Point',
        coordinates: Object.values(i.location)
      }
    }))
    setPopupMap(popup)
  }

  const formikRoute = useFormik({
    initialValues: {
      codeBusRoute: busrouteParams[0]?.codeBusRoute,
      nameRoute: busrouteParams[0]?.nameRoute,
      directionRoute: busrouteParams[0]?.directionRoute || 'turn',
      drivingJourney: busrouteParams[0]?.drivingJourney,
      lineDistance: busrouteParams[0]?.lineDistance,
      operatingTime: busrouteParams[0]?.operatingTime,
      colorRoute: busrouteParams[0]?.colorRoute
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      codeBusRoute: Yup.string()
        .min(3, 'Mã số tuyến xe buýt tối thiểu trên 3 kí tự!')
        .max(7, 'Mã số tuyến xe buýt không được dài quá 7 kí tự!')
        .required('Phải điền mã số tuyến!'),
      nameRoute: Yup.string()
        .min(7, 'Tên tuyến xe buýt tối thiểu trên 7 kí tự!')
        .max(50, 'Tên tuyến xe buýt không được dài quá 50 kí tự!')
        .required('Phải điền tên tuyến xe buýt!'),
      directionRoute: Yup.string().required('Phải chọn chiều của tuyến xe!'),
      drivingJourney: Yup.string().max(1000, 'Mô tả không được dài quá!'),
      lineDistance: Yup.string().max(
        10,
        'Chiều dài tuyến đường không được dài quá 10 kí tự!'
      ),
      operatingTime: Yup.string().max(
        20,
        'Thời gian tuyến hoạt động không được dài quá 20 kí tự!'
      ),
      colorRoute: Yup.string().required('Phải chọn màu của tuyến xe!')
    })
  })

  const [showModal, setShowModal] = useState(false)

  const handleSubmit = () => {
    setShowModal(true)
  }

  const onUpdated = async () => {
    await danabus.updatedBusRoute(busrouteId, busrouteParams)
    await danabus.updatedRoadMap(roadBusRoute[0].id, directionMap)
    setShowModal(false)
  }

  useEffect(() => {
    const filterRoad = roadMap.filter(
      r =>
        r.codeBusRoute === busrouteParams[0].codeBusRoute &&
        r.directionRoute === busrouteParams[0].directionRoute
    )
    setRoadBusRoute(filterRoad)
  }, [busrouteParams, roadMap])

  return (
    <DashBoard>
      <Modal
        title="Bạn có chắc với hành động này?"
        open={showModal}
        okText="Thêm mới"
        cancelText="Hủy"
        onCancel={() => setShowModal(false)}
        onOk={onUpdated}
      />
      <Typography
        style={{ fontSize: '20px', fontWeight: 'bold', padding: '20px' }}
      >
        Chỉnh sửa lộ trình tuyến xe buýt
      </Typography>
      <div>
        <div id="info"></div>
        <div ref={mapContainer} className="map-container" />
      </div>
      <Button onClick={() => setIsAdd(true)}>Thêm trạm xe buýt mới</Button>
      <Button onClick={handleArtLine}>Vẽ tuyến mới</Button>
      <Button onClick={handleSubmit}>Xác nhận tạo mới tuyến</Button>
      <Typography
        style={{ fontSize: '20px', fontWeight: 'bold', padding: '20px' }}
      >
        Chỉnh sửa thông tin tuyến
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Typography style={{ fontWeight: 'bold' }}>Mã số tuyến</Typography>
          <Typography style={{ fontSize: '20px', fontWeight: 'bold' }}>
            {formikRoute.values?.codeBusRoute}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography style={{ fontWeight: 'bold' }}>Tên tuyến</Typography>
          <Typography style={{ fontSize: '20px', fontWeight: 'bold' }}>
            {formikRoute.values?.nameRoute}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl required sx={{ minWidth: 200 }}>
            <Typography style={{ fontWeight: 'bold' }}>
              Chiều của tuyến
            </Typography>
            <Typography style={{ fontSize: '20px', fontWeight: 'bold' }}>
              {formikRoute.values?.directionRoute === 'turn'
                ? 'Chiều đi'
                : 'Chiều về'}
            </Typography>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography style={{ fontWeight: 'bold' }}>
            Mô tả hành trình
          </Typography>
          <TextareaAutosize
            style={{ minWidth: 500, minHeight: 200 }}
            id="drivingJourney"
            name="drivingJourney"
            type="text"
            value={formikRoute.values.drivingJourney}
            onChange={formikRoute.handleChange}
            error={
              formikRoute.touched.drivingJourney &&
              Boolean(formikRoute.errors.drivingJourney)
            }
          />
        </Grid>
        <Grid item xs={12} sm={6} style={{ display: 'flex' }}>
          <FormControl variant="standard">
            <Typography style={{ fontWeight: 'bold' }}>
              Độ dài của tuyến
            </Typography>
            <Input
              id="lineDistance"
              name="lineDistance"
              type="text"
              endAdornment={<InputAdornment position="end">km</InputAdornment>}
              value={formikRoute.values.lineDistance}
              onChange={formikRoute.handleChange}
              error={
                formikRoute.touched.lineDistance &&
                Boolean(formikRoute.errors.lineDistance)
              }
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography style={{ fontWeight: 'bold' }}>
            Thời gian tuyến hoạt động
          </Typography>
          <Typography style={{ fontSize: '20px', fontWeight: 'bold' }}>
            {formikRoute.values.operatingTime}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl required sx={{ m: 1, minWidth: 200 }}>
            <TextField
              id="colorRoute"
              name="colorRoute"
              value={formikRoute.values.colorRoute}
              onChange={formikRoute.handleChange}
              type="color"
              label="Màu của tuyến"
              error={
                formikRoute.touched.colorRoute &&
                Boolean(formikRoute.errors.colorRoute)
              }
            />
          </FormControl>
        </Grid>
      </Grid>
      <Typography
        style={{ fontSize: '20px', fontWeight: 'bold', padding: '20px' }}
      >
        Chỉnh sửa bến xe buýt trong tuyến
      </Typography>
      <Table columns={columns} dataSource={dataSource} />

      {/* Input thêm trạm xe */}
      <Modal
        title="Thêm trạm xe buýt mới"
        open={isAdd}
        okText="Thêm mới"
        cancelText="Hủy"
        onCancel={() => {
          resetEditing()
        }}
        onOk={() => onAddStudent()}
      >
        <Box style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <TextField
            id="nameBusStop"
            name="nameBusStop"
            label="Tên trạm xe buýt"
            value={formik.values.nameBusStop}
            onChange={formik.handleChange}
            error={
              formik.touched.nameBusStop || Boolean(formik.errors.nameBusStop)
            }
            helperText={formik.errors.nameBusStop}
          />
          <TextField
            id="location.lng"
            name="location.lng"
            label="Kinh độ"
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
            label="Vỹ độ"
            value={formik.values.location.lat}
            onChange={formik.handleChange}
            error={
              formik.touched.location?.lat ||
              Boolean(formik.errors.location?.lat)
            }
            helperText={formik.errors.location?.lat}
          />
          <TextField
            id="travelNear"
            name="travelNear"
            label="Địa điểm du lịch gần trạm xe"
            value={formik.values.travelNear}
            onChange={formik.handleChange}
            error={
              formik.touched.travelNear || Boolean(formik.errors.travelNear)
            }
            helperText={formik.errors.travelNear}
          />
          <TextField
            id="travelTime"
            name="travelTime"
            label="Thời gian di chuyển giữa 2 trạm"
            value={formik.values.travelTime}
            onChange={formik.handleChange}
            error={
              formik.touched.travelTime || Boolean(formik.errors.travelTime)
            }
            helperText={formik.errors.travelTime}
          />
        </Box>
      </Modal>

      {/* Edit trạm xe */}
      <Modal
        title="Sửa thông tin trạm xe buýt"
        open={isEditing}
        okText="Lưu lại"
        cancelText="Hủy"
        onCancel={() => {
          resetEditing()
        }}
        onOk={e => {
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
        <Box style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <TextField
            id="nameBusStop"
            name="nameBusStop"
            label="Tên trạm xe buýt"
            value={editformik.values.nameBusStop}
            onChange={editformik.handleChange}
            error={
              editformik.touched.nameBusStop ||
              Boolean(editformik.errors.nameBusStop)
            }
            helperText={editformik.errors.nameBusStop}
          />
          <TextField
            id="location.lng"
            name="location.lng"
            label="Kinh độ"
            value={editformik.values.location.lng}
            onChange={editformik.handleChange}
            error={
              editformik.touched.location?.lng ||
              Boolean(editformik.errors.location?.lng)
            }
            helperText={editformik.errors.location?.lng}
          />
          <TextField
            id="location.lat"
            name="location.lat"
            label="Vỹ độ"
            value={editformik.values.location.lat}
            onChange={editformik.handleChange}
            error={
              editformik.touched.location?.lat ||
              Boolean(editformik.errors.location?.lat)
            }
            helperText={editformik.errors.location?.lat}
          />
          <TextField
            id="travelNear"
            name="travelNear"
            label="Địa điểm du lịch gần trạm xe"
            value={editformik.values.travelNear}
            onChange={editformik.handleChange}
            error={
              editformik.touched.travelNear ||
              Boolean(editformik.errors.travelNear)
            }
            helperText={editformik.errors.travelNear}
          />
          <TextField
            id="travelTime"
            name="travelTime"
            label="Thời gian di chuyển giữa 2 trạm"
            value={editformik.values.travelTime}
            onChange={editformik.handleChange}
            error={
              editformik.touched.travelTime ||
              Boolean(editformik.errors.travelTime)
            }
            helperText={editformik.errors.travelTime}
          />
        </Box>
      </Modal>
    </DashBoard>
  )
}

export default EditBusRoutes
