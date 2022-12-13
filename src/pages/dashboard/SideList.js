import React from 'react'
import { styled } from '@mui/material/styles'
import {
  List,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Box
} from '@mui/material'
import MuiDrawer from '@mui/material/Drawer'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import { useMemo } from 'react'
import { Dashboard, DirectionsBus, Feed, Tour } from '@mui/icons-material'
import BusRoutes from './busroutes/BusRoutes'
import InfoBusRoute from './infobusroute/CreateInfoBusRoute'
import Travels from './travels/Travels'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Main from './main/Main'
import MultiStepForm from './busroutes/MultiStepForm'
import CreateTravels from './travels/CreateTravels'
import Test from './main/Test'
import BusAlertIcon from '@mui/icons-material/BusAlert'
import AddchartIcon from '@mui/icons-material/Addchart'
import ModeOfTravelIcon from '@mui/icons-material/ModeOfTravel'
import CreateInfoBusRoute from './infobusroute/CreateInfoBusRoute'

const drawerWidth = 240

const openedMixin = theme => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen
  }),
  overflowX: 'hidden'
})

const closedMixin = theme => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`
  }
})

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar
}))

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: prop => prop !== 'open'
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme)
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme)
  })
}))

const SideList = ({ open, setOpen }) => {
  const navigate = useNavigate()

  const [selectedLink, setSelectedLink] = useState('')

  const list = useMemo(
    () => [
      {
        title: 'Main',
        icon: <Dashboard />,
        link: '',
        component: <Main {...{ setSelectedLink, link: '' }} />
      },
      {
        title: 'Bus Routes',
        icon: <DirectionsBus />,
        link: 'busroutes',
        component: <BusRoutes {...{ setSelectedLink, link: 'busroutes' }} />
      },
      {
        title: 'Info Bus Route',
        icon: <Feed />,
        link: 'infobusroute',
        component: (
          <InfoBusRoute {...{ setSelectedLink, link: 'infobusroute' }} />
        )
      },
      {
        title: 'Travels',
        icon: <Tour />,
        link: 'travels',
        component: <Travels {...{ setSelectedLink, link: 'travels' }} />
      },
      {
        title: 'Create Bus Routes',
        icon: <BusAlertIcon />,
        link: 'createBusRoutes',
        component: (
          <MultiStepForm {...{ setSelectedLink, link: 'createBusRoutes' }} />
        )
      },
      {
        title: 'Create Travels',
        icon: <ModeOfTravelIcon />,
        link: 'createTravels',
        component: (
          <CreateTravels {...{ setSelectedLink, link: 'createTravels' }} />
        )
      },
      {
        title: 'test',
        link: 'test',
        component: <Test {...{ setSelectedLink, link: 'test' }} />
      }
    ],
    []
  )
  return (
    <>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={() => setOpen(false)}>
            <ChevronLeftIcon />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {list.map(item => (
            <ListItem key={item.title} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5
                }}
                onClick={() => navigate(item.link)}
                selected={selectedLink === item.link}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center'
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.title}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Routes>
          {list.map(item => (
            <Route key={item.title} path={item.link} element={item.component} />
          ))}
        </Routes>
      </Box>
    </>
  )
}

export default SideList
