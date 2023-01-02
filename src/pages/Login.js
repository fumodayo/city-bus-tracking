import * as React from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import danabus from 'danabus'
import { useFormik } from 'formik'
import * as Yup from 'yup'

const theme = createTheme()

export default function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = event => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const newUser = {
      username: data.get('username'),
      password: data.get('password')
    }
    console.log(newUser)
    danabus.loginUser(newUser, dispatch, navigate)
  }

  const formik = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .required('Nhập tên người dùng!')
        .min(6, 'Tài khoản không được ngắn dưới 6 kí tự!'),
      password: Yup.string()
        .required('Nhập mật khẩu!')
        .min(6, 'Mật khẩu không được ngắn dưới 6 kí tự!')
    })
  })

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              'url(https://upload.wikimedia.org/wikipedia/commons/4/4c/Han_River_Bridge_in_Vietnam_Night_View.jpg)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: t =>
              t.palette.mode === 'light'
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Đăng Nhập
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                id="username"
                name="username"
                type="text"
                label="Tên người dùng"
                fullWidth
                required
                value={formik.values.username}
                onChange={formik.handleChange}
                error={
                  formik.touched.username || Boolean(formik.errors.username)
                }
                helperText={formik.errors.username}
                autoComplete="off"
              />
              <TextField
                margin="normal"
                id="password"
                name="password"
                type="password"
                label="Mật khẩu"
                fullWidth
                required
                value={formik.values.password}
                onChange={formik.handleChange}
                error={
                  formik.touched.password || Boolean(formik.errors.password)
                }
                helperText={formik.errors.password}
                autoComplete="off"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Đăng nhập
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  )
}
