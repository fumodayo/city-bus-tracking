import React, { useState, useMemo } from 'react'
import { createTheme, styled, ThemeProvider } from '@mui/material/styles'
import {
  Box,
  Toolbar,
  CssBaseline,
  Typography,
  IconButton,
  Tooltip,
  List,
  Divider,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Button
} from '@mui/material'
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import MenuIcon from '@mui/icons-material/Menu'
import {
  Brightness4,
  Brightness7,
  Home,
  LogoutOutlined
} from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import MuiDrawer from '@mui/material/Drawer'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import { Dashboard, DirectionsBus, Feed, Tour } from '@mui/icons-material'
import BusAlertIcon from '@mui/icons-material/BusAlert'
import { useDispatch, useSelector } from 'react-redux'
import danabus from 'danabus'
import { createAxios } from 'utilities/createInstance'
import { logoutSuccess } from 'redux/slices/auth'

const drawerWidth = 270

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: prop => prop !== 'open'
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  })
}))

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

const DashBoard = ({ children }) => {
  const [open, setOpen] = useState(false)
  const [dark, setDark] = useState(false)

  const user = useSelector(state => state.auth.login?.currentUser)

  const darkTheme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: dark ? 'dark' : 'light'
        }
      }),
    [dark]
  )

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const navigate = useNavigate()

  const list = useMemo(
    () => [
      {
        title: 'Trang chủ',
        icon: <Dashboard />,
        link: '/dashboard'
      },
      {
        title: 'Quản lý tuyến xe buýt',
        icon: <DirectionsBus />,
        link: '/dashboard/busroutes'
      },
      {
        title: 'Thông tin chung về tuyến',
        icon: <Feed />,
        link: '/dashboard/infobusroute'
      },
      {
        title: 'Quản lý địa điểm du lịch',
        icon: <Tour />,
        link: '/dashboard/travels'
      },
      {
        title: 'Tạo tuyến xe buýt',
        icon: <BusAlertIcon />,
        link: '/dashboard/busroute/create'
      }
    ],
    []
  )
  const accessToken = user?.accessToken
  const id = user?.id
  const dispatch = useDispatch()

  let axiosJWT = createAxios(user, dispatch, logoutSuccess)

  const handleLogout = () => {
    danabus.logOut(dispatch, id, navigate, accessToken, axiosJWT)
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="fixed" open={open}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 5,
                ...(open && { display: 'none' })
              }}
            >
              <MenuIcon />
            </IconButton>
            <Tooltip title="Go back to home page">
              <IconButton sx={{ mr: 1 }} onClick={() => navigate('/')}>
                <Home />
              </IconButton>
            </Tooltip>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1 }}
            >
              Trang điều hành
            </Typography>
            {user && (
              <Typography style={{ textTransform: 'uppercase' }}>
                {user.username}
              </Typography>
            )}
            <Button
              onClick={handleLogout}
              variant="outlined"
              sx={{ fontWeight: 'bold', color: '#fff' }}
              endIcon={<LogoutOutlined />}
            >
              Đăng xuất
            </Button>

            <IconButton onClick={() => setDark(!dark)}>
              {dark ? <Brightness7 /> : <Brightness4 />}
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <DrawerHeader>
            <IconButton onClick={() => setOpen(false)}>
              <ChevronLeftIcon />
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            {list.map(item => (
              <ListItem
                key={item.title}
                disablePadding
                sx={{ display: 'block' }}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5
                  }}
                  id={item.link}
                  onClick={() => navigate(item.link)}
                >
                  <Tooltip title={item.title}>
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : 'auto',
                        justifyContent: 'center'
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>
                  </Tooltip>
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
          {children}
        </Box>
      </Box>
    </ThemeProvider>
  )
}

export default DashBoard
