import React, { useState, useEffect, useRef } from 'react'

import { MapContainer, TileLayer, Marker, Circle, useMap, useMapEvents } from 'react-leaflet'
import L from 'leaflet'

import 'leaflet/dist/leaflet.css'
import InputAdornment from '@mui/material/InputAdornment'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'

import Icon from '../icon/Icon'
import { api } from '@/utils/api'
import CustomTextField from '@core/components/mui/TextField'

const customIcon = L.icon({
  iconUrl: '/images/wb.jpg',
  iconSize: [40, 40],
  iconAnchor: [20, 40]
})

const MapEvents = ({ onBoundsChange }) => {
  useMapEvents({
    moveend: event => {
      const bounds = event.target.getBounds()

      onBoundsChange(bounds)
    },
    zoomend: event => {
      const bounds = event.target.getBounds()

      onBoundsChange(bounds)
    }
  })

  return null
}

const MapWithGroups = ({ groups, locations, onLocationClick }) => {
  const map = useMap()

  useEffect(() => {
    map.eachLayer(layer => {
      if (layer instanceof L.Circle || layer instanceof L.Marker) {
        map.removeLayer(layer)
      }
    })

    groups.forEach(group => {
      const { center, left } = group
      const radius = map.distance([center.latitude, center.longitude], [left.latitude, left.longitude])

      L.circle([center.latitude, center.longitude], {
        color: 'transparent',
        fillOpacity: 0,
        radius
      }).addTo(map)

      const markerIcon = L.divIcon({
        className: 'custom-icon',
        html: `<div class="rounded-full  bg-main-700 text-white p-1.5 flex justify-center items-center w-10 h-10">
<div class="bg-white rounded-full h-full w-full flex items-center justify-center text-main-500">
${group.count}
</div>
        </div>`,
        iconSize: [40, 40],
        iconAnchor: [20, 40]
      })

      const marker = L.marker([center.latitude, center.longitude], { icon: markerIcon }).addTo(map)

      marker.on('click', () => {
        const bounds = L.latLngBounds([
          [center.latitude, center.longitude],
          [left.latitude, left.longitude]
        ])

        map.fitBounds(bounds)
      })
    })

    locations.forEach(location => {
      const marker = L.marker([location.latitude, location.longitude], { icon: customIcon }).addTo(map)

      marker.on('click', () => {
        onLocationClick(location)
      })
    })
  }, [groups, locations, map, onLocationClick])

  return null
}

// Handles search results display and navigation
const SearchHandler = ({ searchResults, setSearchResults, setCenter }) => {
  const map = useMap()

  const handleSearchResultClick = boundingbox => {
    const bounds = L.latLngBounds([
      [boundingbox[0], boundingbox[2]],
      [boundingbox[1], boundingbox[3]]
    ])
    map.fitBounds(bounds)
    setSearchResults([])
    setCenter([boundingbox[0], boundingbox[2]])
  }

  if (!searchResults || searchResults.length === 0) return null

  return (
    <div className='flex flex-col gap-1 mb-2 ml-4 search-results'>
      {searchResults.map((result, index) => (
        <div
          key={index}
          className='font-medium search-result hover:cursor-pointer'
          onClick={() => handleSearchResultClick(result.bbox)}
        >
          {result.text.split(',')[0]}
        </div>
      ))}
    </div>
  )
}

// Main Map component
const Map = ({ onSelectLocation, onClose }) => {
  const [open, setOpen] = useState(false)
  const [groups, setGroups] = useState([])
  const [locations, setLocations] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [center, setCenter] = useState([55.751244, 37.618423])
  const [selectedLocation, setSelectedLocation] = useState(null)

  const mapRef = useRef(null)

  const fetchBoundsData = async bounds => {
    try {
      const response = await api({
        url: '/location/box/',
        method: 'POST',
        data: {
          latitude_1: bounds.getNorthWest().lat,
          longitude_1: bounds.getNorthWest().lng,
          latitude_2: bounds.getNorthEast().lat,
          longitude_2: bounds.getNorthEast().lng,
          latitude_3: bounds.getSouthWest().lat,
          longitude_3: bounds.getSouthWest().lng,
          latitude_4: bounds.getSouthEast().lat,
          longitude_4: bounds.getSouthEast().lng
        }
      })

      setGroups(response.data.groups || [])
      setLocations(response.data.locations || [])
    } catch (error) {
      console.error('Error fetching bounds data:', error)
    }
  }

  const handleSearch = async event => {
    const query = event.target.value

    setSearchQuery(query)

    if (query.length >= 1) {
      try {
        const response = await fetch(`https://api.maptiler.com/geocoding/${query}.json?key=ZN1Pjco1lBmYKeyRqORC`)
        const data = await response.json()

        setSearchResults(data.features)
      } catch (error) {
        console.error('Error in search:', error)
      }
    } else {
      setSearchResults([])
    }
  }

  const handleLocationClick = location => {
    setSelectedLocation(location)
    setOpen(true)
  }

  useEffect(() => {
    if (mapRef.current) {
      const map = mapRef.current
      const bounds = map.getBounds()

      fetchBoundsData(bounds)
    }
  }, [])

  return (
    <div className='flex h-adress !overflow-x-hidden '>
      <div className='flex max-h-full overflow-y-hidden w-72 min-w-72'>
        <div className='w-full flex flex-col gap-2 p-2.5 max-h-[calc(100vh-170px)] overflow-y-auto custom-scroll'>
          {locations.map((loc, i) => (
            <div
              key={i}
              className='p-2.5 rounded-md px-3 py-2.5 border'
              onClick={() => {
                handleLocationClick(loc)
              }}
            >
              {loc.address}
            </div>
          ))}
        </div>
      </div>
      <div className='relative flex-grow h-full'>
        <MapContainer
          center={center}
          zoom={10}
          style={{ height: '500px', width: '100%' }}
          whenReady={({ target }) => {
            mapRef.current = target
            const bounds = target.getBounds()

            fetchBoundsData(bounds)
          }}
        >
          <TileLayer
            url='https://api.maptiler.com/maps/basic/{z}/{x}/{y}.png?key=ZN1Pjco1lBmYKeyRqORC'
            attribution='&copy; OpenStreetMap contributors'
          />
          <MapEvents onBoundsChange={fetchBoundsData} />
          <MapWithGroups groups={groups} locations={locations} onLocationClick={handleLocationClick} />

          <div
            className='z-[999] absolute top-4 left-4 poisk hover:cursor-default'
            onMouseEnter={() => mapRef.current.scrollWheelZoom.disable()}
            onMouseLeave={() => mapRef.current.scrollWheelZoom.enable()}
          >
            <Card>
              <CardContent>
                <CustomTextField
                  id='input-with-icon-adornment'
                  className='min-w-[200px] w-1/3 p-2'
                  type='search'
                  value={searchQuery}
                  onChange={handleSearch}
                  placeholder='Поиск'
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start' onClick={e => e.stopPropagation()}>
                        <i className='tabler-search' />
                      </InputAdornment>
                    )
                  }}
                />
                <SearchHandler
                  searchResults={searchResults}
                  setSearchResults={setSearchResults}
                  setCenter={setCenter}
                />
              </CardContent>
            </Card>
          </div>
        </MapContainer>

        <Dialog aria-labelledby='simple-dialog-title' open={open} onClose={() => setOpen(false)}>
          <div>
            <Card>
              <CardContent>
                <div className='flex items-center justify-between gap-6 mb-6 min-w-96'>
                  <h4 className='text-lg'>Пункт выдачи Wildberries</h4>
                  <span className='text-main-500' onClick={() => setOpen(false)}>
                    <Icon type='close' width='24' />
                  </span>
                </div>
                {selectedLocation && (
                  <>
                    <p className='mb-2 text-base'> {selectedLocation.work_time}</p>
                    <p className='text-base'>{selectedLocation.address}</p>
                  </>
                )}
                <div className='grid grid-cols-2 gap-6 mt-6'>
                  <Button variant='outlined' className='!w-full' onClick={() => onClose()}>
                    Выбрать
                  </Button>
                  <Button
                    variant='contained'
                    color='primary'
                    className='!w-full'
                    onClick={() => onSelectLocation(selectedLocation)}
                  >
                    Добавить
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </Dialog>
      </div>
    </div>
  )
}

export default Map
