import React from 'react'
import CenterImage from 'images/icon_center.png'
import CheckingImage from 'images/icon_checking.png'
import CulturalImage from 'images/icon_cultural.png'
import DiscoverImage from 'images/icon_discover.png'
import NightImage from 'images/icon_night.png'

const MarkerTravelImage = ({
  id,
  typeLocation,
  mouseEnter,
  mouseLeave,
  onClick
}) => {
  let image = null
  switch (typeLocation) {
    case 'center':
      image = CenterImage
      break
    case 'checkin':
      image = CheckingImage
      break
    case 'cultural':
      image = CulturalImage
      break
    case 'discover':
      image = DiscoverImage
      break
    case 'night':
      image = NightImage
      break
    default:
      image = NightImage
  }

  return (
    <img
      style={{
        height: 34,
        width: 34,
        cursor: 'pointer',
        border: '2px solid #fff',
        borderRadius: '50%',
        boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px'
      }}
      src={image}
      alt="marker"
      onMouseEnter={mouseEnter}
      onMouseLeave={mouseLeave}
      onClick={onClick}
      id={id}
    />
  )
}

export default MarkerTravelImage
