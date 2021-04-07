import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import useFetch from './useFetch';
import { marker } from 'leaflet';

function KiteMap() {

  let url = "https://606cae1c603ded0017502834.mockapi.io/spot"
  const { data } = useFetch(url)



  return (
    <div>
      <MapContainer center={[35.505, 10.09]} zoom={5} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker
          position={[45.097, 25.444]}
        >
          <Popup>
            Homeland
          </Popup>
        </Marker>

        {data.map(location =>
          <Marker
            key={location.id}
            position={[location.lat, location.long]}
            ><Popup
              position={[location.lat, location.long]}
              >
              <div>
                <h2>{location.name}</h2>
                <p>{location.country}</p>
                <p> WIND PROBABILITY<br />{location.probability}</p>
              </div>
            </Popup>)
          </Marker>)}

      </MapContainer>
    </div>
  )

}

export default KiteMap