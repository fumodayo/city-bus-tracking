import {
  Box,
  Step,
  StepLabel,
  Stepper,
  Typography,
  Button
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import CreateBusRoutes from './CreateBusRoutes'
import CreateBusStops from './CreateBusStops'
import CreateTimeBusStart from './CreateTimeBusStart'

const steps = [
  'Tạo tuyến xe buýt',
  'Tạo bến xe buýt',
  'Tạo thời gian xe xuất bến'
]

const MultiStepForm = ({ setSelectedLink, link }) => {
  useEffect(() => {
    setSelectedLink(link)
  }, [])

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

  const initialDataBusRoutes = {
    codeBusRoute: '',
    nameRoute: '',
    directionRoute: '',
    drivingJourney: '',
    lineDistance: '',
    operatingTime: '',
    colorRoute: '#000000'
  }

  const [dataBusRoutes, setDataBusRoutes] = useState(initialDataBusRoutes)
  const updateFormBusRoutes = fields => {
    setDataBusRoutes(newData => {
      return { ...newData, ...fields }
    })
  }

  const [dataBusStops, setDataBusStops] = useState([])

  const renderComponentChild = () => {
    switch (activeStep) {
      case 0:
        return (
          <CreateBusRoutes
            {...dataBusRoutes}
            updateFormBusRoutes={updateFormBusRoutes}
          />
        )
      case 1:
        return <CreateBusStops setDataBusStops={setDataBusStops} />
      case 2:
        return <CreateTimeBusStart />
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

    const onSubmit = () => {
      switch (activeStep) {
        case 0:
          return dataBusRoutes
        case 1:
          return dataBusStops
        case 2:
          return 2
        default:
          return <div>Loi</div>
      }
    }
    console.log(onSubmit())
  }

  return (
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
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Trở lại bước trước
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleNext}>
              {activeStep === steps.length - 1
                ? 'Hoàn thành'
                : 'Bước tiếp theo'}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
  )
}

export default MultiStepForm
