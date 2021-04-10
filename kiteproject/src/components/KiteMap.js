import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { marker } from 'leaflet';
import FilterPopup from './FilterPopup'
import { useState } from 'react'
import useFilterForm from'./useFilterForm'
import filter from '../images/filter.png'
import './kiteMap.css'

const KiteMap = () => {

  const {data, isPending, error,formular}=useFilterForm();
  const [isOpen, setIsOpen] = useState(false);
  return (

    <div>
      {error && <div>{error}</div>}
      {isPending && <div>Loading..</div>}
      
      
      <FilterPopup open={isOpen} closeIt={() => {setIsOpen(false) }} >
        {formular}
      </FilterPopup>

      <MapContainer center={[35.505, 10.09]} zoom={5} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <div onClick={() => setIsOpen(true)} ><img className='filterButton' src={filter} alt='filter'/></div> 

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

          >
            <Popup
              position={[location.lat, location.long]}
            >
              <div>

                <h2>{location.name}</h2> <p>{location.country}</p>
                <p> WIND PROBABILITY<br />{location.probability}</p>
                <p>LATITUDE <br />{location.lat}</p>
                <p>LONGITUDE<br /> {location.long}</p>
                <p>BEST PERIOD OF TIME <br /> {location.month} </p>
              </div>
            </Popup>)
          </Marker>)}

      </MapContainer>

    </div>
  )

}

export default KiteMap