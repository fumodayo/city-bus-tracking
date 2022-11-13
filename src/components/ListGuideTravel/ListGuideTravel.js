import React, { useEffect, useState } from 'react'
import { locationTravelData } from 'actions/initialData/locationTravelData'
import FormInput from 'components/Common/FormInput'
import {
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Paper,
  Drawer,
  Typography,
  Box,
  IconButton,
  styled
} from '@mui/material'
import HTMLReactParser from 'html-react-parser'
import { cloneDeep } from 'lodash'
import { Close } from '@mui/icons-material'
import { useDispatch } from 'react-redux'
import './ListGuideTravel.scss'
import { setIDTravel } from 'redux/slices/routes'

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar
}))

const ListGuideTravel = () => {
  // Get word input to search
  const [search, setSearch] = useState('')
  const handleChangeWordSearch = e => {
    setSearch(e)
  }

  const [dataTravel, setDataTravel] = useState([])

  useEffect(() => {
    // Handle filter search
    setSearch(search)
    const travelData = cloneDeep(locationTravelData)
    const filterDataTravel = travelData.filter(travel => travel.title)
    if (search !== '') {
      const newSearchList = filterDataTravel.filter(route => {
        return Object.values(route)
          .join('')
          .toLowerCase()
          .includes(search.toLowerCase())
      })
      setDataTravel(newSearchList)
    } else {
      setDataTravel(filterDataTravel)
    }
  }, [search])

  const dispatch = useDispatch()
  const [idItem, setItem] = useState('')
  const handleGetIdListItemImage = e => {
    const idLocation = e.currentTarget.id
    dispatch(setIDTravel(idLocation))
    setItem(idLocation)
    setIsOpen(!isOpen)
  }

  const [locationTravel, setLocationTravel] = useState({})
  useEffect(() => {
    const dataLocation = locationTravelData.filter(i => i.id === idItem)[0]
    setLocationTravel(dataLocation)
  }, [idItem])

  const [isOpen, setIsOpen] = useState(false)

  const toggleOpenSidebar = () => {
    setIsOpen(!isOpen)
  }

  const [nameTypeTravel, setNameTypeTravel] = useState('')
  useEffect(() => {
    let typeLocationTravel = ''
    switch (locationTravel?.typeLocation) {
      case 'discover':
        typeLocationTravel = 'Địa điểm <strong>khám phá</strong>'
        break
      case 'cultural':
        typeLocationTravel = 'Địa điểm <strong>văn hóa</strong>'
        break
      case 'checking':
        typeLocationTravel = 'Địa điểm <strong>chụp ảnh đẹp</strong>'
        break
      case 'center':
        typeLocationTravel = 'Trung tâm <strong>vui chơi - giải trí</strong>'
        break
      case 'night':
        typeLocationTravel = 'Địa điểm <strong>vui chơi vào ban đêm</strong>'
        break
      default:
        typeLocationTravel = 'Địa điểm <strong>vui chơi - giải trí</strong>'
    }
    setNameTypeTravel(typeLocationTravel)
  }, [locationTravel])

  return (
    <div className="all-information-travel">
      <Paper
        component="form"
        sx={{
          p: '2px 4px',
          display: 'flex',
          alignItems: 'center',
          width: 350,
          border: 'none',
          borderRadius: '15px',
          boxShadow: '0px 0px 7px 2px rgb(0 0 0 / 15%)',
          backgroundColor: '#ffffff',
          height: '3em',
          fontSize: '1rem',
          marginBottom: '20px'
        }}
      >
        <FormInput
          onChange={handleChangeWordSearch}
          placeholder={'Nhập tên địa điểm bạn thích...'}
        />
      </Paper>
      <ImageList
        sx={{
          width: 350,
          maxHeight: 800,
          cursor: 'pointer'
        }}
        cols={1}
      >
        {dataTravel.map(imageTravel => (
          <ImageListItem
            key={imageTravel.id}
            id={imageTravel.id}
            onClick={handleGetIdListItemImage}
          >
            <img
              style={{
                minWidth: 330,
                maxHeight: 260,
                paddingTop: '10px',
                borderRadius: '30px'
              }}
              src={imageTravel.image}
              srcSet={imageTravel.image}
              alt={imageTravel.imageDesc}
              loading="lazy"
            />
            <ImageListItemBar
              style={{
                fontSize: '18px',
                minWidth: 330,
                borderBottomLeftRadius: '30px',
                borderBottomRightRadius: '30px'
              }}
              title={imageTravel.title}
              subtitle={HTMLReactParser(imageTravel.description)}
            />
          </ImageListItem>
        ))}
        {isOpen && (
          <Drawer
            variant="persistent"
            anchor="right"
            hideBackdrop={true}
            open={isOpen}
          >
            <DrawerHeader
              sx={{ position: 'relative', backgroundColor: '#3597E4' }}
            >
              <Typography
                style={{ fontWeight: '600', color: '#fff', marginLeft: '10px' }}
              >
                {locationTravel?.title}
              </Typography>
              <IconButton onClick={toggleOpenSidebar}>
                <Close fontSize="medium" sx={{ color: '#fff' }} />
              </IconButton>
            </DrawerHeader>
            <Box
              sx={{
                width: 400,
                height: '100%',
                pt: 1,
                overflow: 'hidden'
              }}
            >
              <img
                style={{
                  width: 400,
                  height: 320,
                  objectFit: 'cover',
                  backgroundPosition: 'center'
                }}
                src={locationTravel?.image}
                alt={locationTravel?.imageDesc}
              />
              <div className="info-travel">
                <h1 className="header-info">Thông tin địa điểm:</h1>
                <div className="info">
                  <label>Loại hình du lịch: </label>
                  <span>{HTMLReactParser(nameTypeTravel)}</span>
                </div>
                <hr style={{ margin: '5px', border: '1px solid #000' }} />
                <div className="info">
                  <label>Giới thiệu chung:</label>
                  <span>
                    {locationTravel &&
                      HTMLReactParser(locationTravel?.description)}
                  </span>
                </div>
                <div className="info">
                  <label>Địa chỉ: </label>
                  <span>{locationTravel?.locationName}</span>
                </div>
                <div className="info">
                  <label>Tọa độ trên GoogleMap: </label>
                  <a href={locationTravel?.locationLink}>Tại đây</a>
                </div>
              </div>
            </Box>
          </Drawer>
        )}
      </ImageList>
    </div>
  )
}

export default ListGuideTravel
