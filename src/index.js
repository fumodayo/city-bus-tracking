import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Provider } from 'react-redux'
import store from 'redux/store'
import { BrowserRouter } from 'react-router-dom'
import { registerLicense } from '@syncfusion/ej2-base'

registerLicense(
  `Mgo+DSMBaFt/QHRqVVhjVFpFaV1HQmFJfFBmTGlce1RwfEU3HVdTRHRdQ19hT39TdkRnXH5adnw=;Mgo+DSMBPh8sVXJ0S0J+XE9HflRDQmFMYVF2R2BJdlR1cF9GaEwgOX1dQl9hSHxRcERjWX5adXZQRWY=;ORg4AjUWIQA/Gnt2VVhkQlFadVdJXHxLe0x0RWFab1d6cVFMYFRBNQtUQF1hS39RdENiWX9fdHFXT2la;ODE5NTc2QDMyMzAyZTM0MmUzMEVHbEc0YVBoeDNjdTU3cmQrc0h6T1ZNR2xVOFJ3S2dsd3c5a3ZBNDF1UW89;ODE5NTc3QDMyMzAyZTM0MmUzMGJqa0tyVUVQODdxd3k3ckhFWk92VndyVWtZdDhvVVVRMkxEM2VPUmtwTDg9;NRAiBiAaIQQuGjN/V0Z+WE9EaFxKVmJWfFZpR2NbfE55flBCalxZVAciSV9jS3xSdEdlWH9ecXBQQGRYVQ==;ODE5NTc5QDMyMzAyZTM0MmUzMFJ4amFrSURiV3NDOGlPVzkwNXc5dFgzcXFDM1JrbThyRTRFcWJJNEdQaHM9;ODE5NTgwQDMyMzAyZTM0MmUzMGpleHEvbmxFOWJOSjM3MHJOUEY1ZlNRcnBaNlhyZ2oyMHVscFE4WVpDZGs9;Mgo+DSMBMAY9C3t2VVhkQlFadVdJXHxLe0x0RWFab1d6cVFMYFRBNQtUQF1hS39RdENiWX9fdHFcTmlb;ODE5NTgyQDMyMzAyZTM0MmUzME1meTA4MUVGNXpQZU5rSDZrb1pJdW9IQ0JzT2hUSGo5Z2txdHNHL2JEYXc9;ODE5NTgzQDMyMzAyZTM0MmUzMEJMZzhxREZXeW5RYkxoUGw0cWpuWHFRaktIOUhhS25XZUMvYWJJYkw5eFE9;ODE5NTg0QDMyMzAyZTM0MmUzMFJ4amFrSURiV3NDOGlPVzkwNXc5dFgzcXFDM1JrbThyRTRFcWJJNEdQaHM9`
)

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)
