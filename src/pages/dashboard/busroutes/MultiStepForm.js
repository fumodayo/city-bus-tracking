import {
  Box,
  Step,
  StepLabel,
  Stepper,
  Typography,
  Button
} from '@mui/material'
import React, { useState } from 'react'
import CreateBusRoutes from './CreateBusRoutes'
import CreateBusStops from './CreateBusStops'
import CreateTimeBusStart from './CreateTimeBusStart'
import { SkipNext, SkipPrevious } from '@mui/icons-material'
import DashBoard from '../DashBoard'

const steps = [
  'Tạo tuyến xe buýt',
  'Tạo trạm xe buýt',
  'Tạo thời gian xe xuất bến'
]

const MultiStepForm = () => {
  const [activeStep, setActiveStep] = useState(0)
  const [skipped, setSkipped] = useState(new Set())

  const isStepSkipped = step => {
    return skipped.has(step)
  }

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1)
  }

  const handleReset = () => {
    setActiveStep(0)
  }

  const [dataBusRoutes, setDataBusRoutes] = useState({})

  const renderComponentChild = () => {
    switch (activeStep) {
      case 0:
        return <CreateBusRoutes setDataBusRoutes={setDataBusRoutes} />
      case 1:
        return <CreateBusStops dataBusRoutes={dataBusRoutes} />
      case 2:
        return <CreateTimeBusStart dataBusRoutes={dataBusRoutes} />
      default:
        return null
    }
  }

  const handleNext = () => {
    let newSkipped = skipped
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values())
      newSkipped.delete(activeStep)
    }
    setActiveStep(prevActiveStep => prevActiveStep + 1)
    setSkipped(newSkipped)
  }

  return (
    <DashBoard>
      <Box sx={{ width: '100%' }}>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const stepProps = false
            const labelProps = {}

            if (isStepSkipped(index)) {
              stepProps.completed = false
            }
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            )
          })}
        </Stepper>
        {activeStep === steps.length ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              Đã hoàn thành - Xin vui lòng đợi...
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={handleReset}>Làm tiếp</Button>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            {renderComponentChild()}
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Button
                variant="contained"
                sx={{ fontWeight: 'bold', mr: 1 }}
                disabled={activeStep === 0}
                onClick={handleBack}
                startIcon={<SkipPrevious />}
              >
                Trở lại bước trước
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button
                onClick={handleNext}
                variant="contained"
                sx={{ fontWeight: 'bold', mr: 1 }}
                endIcon={<SkipNext />}
              >
                {activeStep === steps.length - 1
                  ? 'Hoàn thành'
                  : 'Bước tiếp theo'}
              </Button>
            </Box>
          </React.Fragment>
        )}
      </Box>
    </DashBoard>
  )
}

export default MultiStepForm
