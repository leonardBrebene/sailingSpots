import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { Icon } from 'leaflet';
import FilterPopup from './FilterPopup'
import { useState } from 'react'
import useFilterForm from './useFilterForm'
import filter from '../images/filter.png'
import orangeicon from '../images/orange-icon.png'; import blueicon from '../images/blue-icon.png';
import './KiteMap.css'

import useFetch from './useFetch';


const KiteMap = () => {

  const { data, isPending, error, formular } = useFilterForm();
  const { data: favourites, isPending: favouriteIsPending, favoritesError } = useFetch("https://606cae1c603ded0017502834.mockapi.io/favourites")
  const [isOpen, setIsOpen] = useState(false);
  // console.log('favourites', favourites)
  // console.log('data', data)
  // console.log('ispending',isPending)
  // console.log('favariteispending',favouriteIsPending)

  function getIcon(locationid){
     for(let i=0;i<favourites.length;i++){
      if (parseInt(favourites[i].spot)  === parseInt(locationid))
      return new Icon({
        iconUrl: orangeicon,
        iconSize: [25, 41],
      });;
     } return new Icon({
      iconUrl: blueicon,
      iconSize: [25, 41],
    });;
    }
  
  return (

    <div>
      <div className='addSpotButton'>Adds Spot</div>
      {error && <div>{error}</div>}
      {isPending && <div>Loading..</div>}



      <FilterPopup open={isOpen} closeIt={() => { setIsOpen(false) }} >
        {formular}
      </FilterPopup>

      <MapContainer center={[35.505, 10.09]} zoom={5} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <div onClick={() => setIsOpen(true)} ><img className='filterButton' src={filter} alt='filter' /></div>

        <Marker
          position={[45.097, 25.444]}
        >
          <Popup>
            Homeland
          </Popup>
        </Marker>


        {data.map(location =>

          <Marker
            icon={!isPending&&!favouriteIsPending?getIcon(location.id): new Icon({  //if is pending set them blue
              iconUrl: blueicon,
              iconSize: [25, 41],
            })}
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
                <div onClick={(e) => e.preventDefault()}>Add to favorites</div>
              </div>
            </Popup>)
          </Marker>)}

      </MapContainer>

    </div>
  )

}

export default KiteMap