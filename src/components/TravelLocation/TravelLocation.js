import React, { useState } from 'react'
import { Checkbox } from '@mui/material'

const TravelLocation = () => {
  const [isChecked, setIsChecked] = useState(false)
  const handleOnChangeChecked = () => {
    setIsChecked(!isChecked)
  }
  // console.log(isChecked)
  return (
    <div className="travel-location">
      <div style={{ cursor: 'pointer' }} className="row align-items-center h-100">
        <div className="small-3">
          <div className="route-no travel text-center">
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
    </div>
  )
}

export default TravelLocation
