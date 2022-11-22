import React from 'react'
import { Close } from '@mui/icons-material'
import { Box, Drawer, IconButton, Typography, styled } from '@mui/material'
import HTMLReactParser from 'html-react-parser'
import { useState } from 'react'
import { useEffect } from 'react'
import { useTravel } from 'hooks/useTravel'
import { useDispatch, useSelector } from 'react-redux'
import { setShowSidebarTravel } from 'redux/slices/form'

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar
}))

const SidebarTravel = () => {
  const travels = useTravel()
  const { isShowSidebar, idTravelLocation } = useSelector(
    state => state.form.sidebarTravel
  )
  const [isShow, setIsShow] = useState(false)
  const [locationTravel, setLocationTravel] = useState({})
  useEffect(() => {
    const dataLocation = travels.filter(i => i.id === idTravelLocation)[0]
    setLocationTravel(dataLocation)
    setIsShow(isShowSidebar)
  }, [idTravelLocation, travels, isShowSidebar])

  const dispatch = useDispatch()

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
    <div className="sidebar-travel">
      {locationTravel && (
        <Drawer
          variant="persistent"
          anchor="right"
          hideBackdrop={true}
          open={isShow}
          style={{ transition: 'all 0.5s ease' }}
        >
          <DrawerHeader
            sx={{ position: 'relative', backgroundColor: '#3597E4' }}
          >
            <Typography
              style={{ fontWeight: '600', color: '#fff', marginLeft: '10px' }}
            >
              {locationTravel?.title}
            </Typography>
            <IconButton>
              <Close
                fontSize="medium"
                sx={{ color: '#fff' }}
                onClick={() =>
                  dispatch(
                    setShowSidebarTravel({
                      isShowSidebar: false,
                      idTravelLocation: ''
                    })
                  )
                }
              />
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
                <span>{nameTypeTravel && HTMLReactParser(nameTypeTravel)}</span>
              </div>
              <hr style={{ margin: '5px', border: '1px solid #000' }} />
              <div className="info">
                <label>Giới thiệu chung:</label>
                <span>
                  {locationTravel?.description &&
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
    </div>
  )
}

export default SidebarTravel
