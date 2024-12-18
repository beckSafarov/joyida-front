export interface LatLng {
  lat: number
  lng: number
}

export interface Address {
  formattedAddress: string
  street?: string
  houseNumber?: string
}

export interface MapComponentProps {
  onLocationSelect: (latLng: LatLng, address: Address) => void
}
