import React, { useEffect, useState } from 'react'
import { locationTravelData } from 'actions/initialData/locationTravelData'
import FormInput from 'components/Common/FormInput'
import { ImageList, ImageListItem, ImageListItemBar, Paper } from '@mui/material'
import HTMLReactParser from 'html-react-parser'
import { cloneDeep } from 'lodash'

const AllInformationTravel = () => {
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
        return Object.values(route).join('').toLowerCase().includes(search.toLowerCase())
      })
      setDataTravel(newSearchList)
    } else {
      setDataTravel(filterDataTravel)
    }
  }, [search])

  return (
    <div className="all-information-travel">
      <Paper
        component="form"
        sx={{
          p: '2px 4px',
          display: 'flex',
          alignItems: 'center',
          width: 330,
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
          height: 800,
          overflowX: 'hidden',
          cursor: 'pointer'
        }}
        cols={1}
      >
        {dataTravel.map(i => (
          <ImageListItem key={i.image}>
            <img
              style={{ width: 350, height: 260, paddingTop: '10px' }}
              src={i.image}
              srcSet={i.image}
              alt={i.imageDesc}
              loading="lazy"
            />
            <ImageListItemBar
              style={{ fontSize: '18px' }}
              title={i.title}
              subtitle={HTMLReactParser(i.description)}
            />
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  )
}

export default AllInformationTravel
