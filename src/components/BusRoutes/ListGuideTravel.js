import React, { useEffect, useState } from 'react'
import FormInput from 'components/Common/FormInput'
import {
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Paper
} from '@mui/material'
import HTMLReactParser from 'html-react-parser'
import { useDispatch } from 'react-redux'
import { setIDTravel } from 'redux/slices/routes'
import { useTravel } from 'hooks/useTravel'
import './ListGuideTravel.scss'
import SidebarTravel from './SidebarTravel'
import { setShowSidebarTravel } from 'redux/slices/form'

const ListGuideTravel = () => {
  const travels = useTravel()
  // Get word input to search
  const [search, setSearch] = useState('')
  const handleChangeWordSearch = e => {
    setSearch(e)
  }

  const [dataTravel, setDataTravel] = useState([])

  useEffect(() => {
    // Handle filter search
    setSearch(search)
    const filterDataTravel = travels.filter(travel => travel.title)
    if (search !== '') {
      const newSearchList = filterDataTravel.filter(route => {
        return Object.values(route)
          .join('')
          .toLowerCase()
          .includes(search.toLowerCase())
      })
      setDataTravel(newSearchList)
    } else {
      setDataTravel(filterDataTravel)
    }
  }, [search, travels])

  const dispatch = useDispatch()
  const [idItem, setItem] = useState('')
  const handleGetIdListItemImage = e => {
    const idLocation = e.currentTarget.id
    setItem(idLocation)
  }

  dispatch(setIDTravel(idItem))
  dispatch(
    setShowSidebarTravel({ isShowSidebar: true, idTravelLocation: idItem })
  )

  return (
    <div className="all-information-travel">
      <Paper
        component="form"
        sx={{
          p: '2px 4px',
          display: 'flex',
          alignItems: 'center',
          width: 350,
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
          maxHeight: 800,
          cursor: 'pointer'
        }}
        cols={1}
      >
        {dataTravel.map(imageTravel => (
          <ImageListItem
            key={imageTravel.id}
            id={imageTravel.id}
            onClick={handleGetIdListItemImage}
          >
            <img
              style={{
                minWidth: 330,
                maxHeight: 260,
                paddingTop: '10px',
                borderRadius: '30px'
              }}
              src={imageTravel.image}
              srcSet={imageTravel.image}
              alt={imageTravel.imageDesc}
              loading="lazy"
            />
            <ImageListItemBar
              style={{
                fontSize: '18px',
                minWidth: 330,
                borderBottomLeftRadius: '30px',
                borderBottomRightRadius: '30px'
              }}
              title={imageTravel.title}
              subtitle={HTMLReactParser(imageTravel.description)}
            />
          </ImageListItem>
        ))}
      </ImageList>
      {idItem && <SidebarTravel />}
    </div>
  )
}

export default ListGuideTravel
