import React, { useState, useEffect } from 'react'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'
import { Address, LatLng, MapComponentProps } from '@/interfaces/Map'

const addressDefaults = {
  formattedAddress: '',
  street: '',
  houseNumber: '',
}

const MapComponent: React.FC<MapComponentProps> = ({ onLocationSelect }) => {
  const [selectedLocation, setSelectedLocation] = useState<LatLng | null>(null)
  const [currentLocation, setCurrentLocation] = useState<LatLng>({
    lat: -3.745,
    lng: -38.523,
  }) //
  const [address, setAddress] = useState<Address>(addressDefaults)

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude
          const lng = position.coords.longitude
          setCurrentLocation({ lat, lng })
        },
        (error) => {
          console.error('Error retrieving location', error)
          // Handle error or keep the default location
        }
      )
    }

    if (selectedLocation) onLocationSelect(selectedLocation, address)
  }, [selectedLocation, address])

  const handleMapClick = (event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      const lat = event.latLng.lat()
      const lng = event.latLng.lng()
      const latLng = { lat, lng }
      setSelectedLocation(latLng)
      getAddressFromLatLng(latLng)
    }
  }

  const getAddressFromLatLng = (latLng: LatLng) => {
    const geocoder = new google.maps.Geocoder()
    geocoder.geocode({ location: latLng }, (results, status) => {
      if (status === 'OK' && results && results.length > 0) {
        const addressComponents = results[0].address_components
        const formattedAddress = results[0].formatted_address

        // Extracting street and house number if available
        let street = ''
        let houseNumber = ''
        addressComponents.forEach((component) => {
          if (component.types.includes('route')) {
            street = component.long_name
          }
          if (component.types.includes('street_number')) {
            houseNumber = component.long_name
          }
        })

        const address = {
          formattedAddress,
          street,
          houseNumber,
        }
        setAddress(address)
        console.log(address)
      } else {
        console.error('Geocoder failed due to: ' + status)
      }
    })
  }

  return (
    <LoadScript
      googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string}
    >
      <GoogleMap
        onClick={handleMapClick}
        center={currentLocation}
        zoom={10}
        mapContainerStyle={{
          height: '100%',
          width: '100%',
          cursor: 'pointer',
        }}
      >
        {selectedLocation && <Marker position={selectedLocation} />}
      </GoogleMap>
    </LoadScript>
  )
}

export default MapComponent
