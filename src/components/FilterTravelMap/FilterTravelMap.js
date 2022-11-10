import React, { useEffect, useState } from 'react'
import { Checkbox } from '@mui/material'
import { Drawer, IconButton, Typography, Box, styled } from '@mui/material'
import { Close } from '@mui/icons-material'
import ListGuideTravel from 'components/ListGuideTravel/ListGuideTravel'
import { useDispatch } from 'react-redux'
import { checkboxTravelChange } from 'redux/actions'

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar
}))

const FilterTravelMap = () => {
  const [isChecked, setIsChecked] = useState(false)
  const handleOnChangeChecked = () => {
    setIsChecked(!isChecked)
    if (isChecked !== true) {
      setIsOpen(true)
    } else {
      setIsOpen(false)
    }
  }

  const [isOpen, setIsOpen] = useState(false)

  const toggleOpenSidebar = () => {
    setIsOpen(!isOpen)
  }

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(checkboxTravelChange(isChecked))
  }, [isChecked])

  return (
    <div className="travel-location">
      <div className="row align-items-center h-100">
        <div className="small-3">
          <div className="route-no text-center">
            <span>Travel</span>
          </div>
        </div>

        <div className="small-7">
          <p className="code-route">Tourist Destinations</p>
          <p className="code-desc" style={{ fontSize: '14px' }}>
            Những địa điểm du lịch nổi tiếng tại Đà Nẵng
          </p>
        </div>
        <div className="small-2">
          <div className="text-center">
            <Checkbox
              checked={isChecked}
              onChange={handleOnChangeChecked}
              sx={{ '& .MuiSvgIcon-root': { fontSize: 30 } }}
            />
          </div>
        </div>
        <hr style={{ marginTop: '10px', border: '1px solid #2247c7' }}></hr>
      </div>
      {(isChecked || isOpen) && (
        <div className="sidebar-travel-location">
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
                Danh sách địa điểm du lịch tại Đà Nẵng
              </Typography>
              <IconButton onClick={toggleOpenSidebar}>
                <Close fontSize="medium" sx={{ color: '#fff' }} />
              </IconButton>
            </DrawerHeader>
            <Box
              sx={{
                width: 400,
                height: '100%',
                p: 3,
                overflow: 'hidden'
              }}
            >
              <ListGuideTravel />
            </Box>
          </Drawer>
        </div>
      )}
    </div>
  )
}

export default FilterTravelMap
