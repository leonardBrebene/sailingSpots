import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { Icon } from 'leaflet';
import FilterPopup from './FilterPopup'
import { useState, useEffect } from 'react'
import useFilterForm from './useFilterForm'
import filter from '../images/filter.png'
import orangeicon from '../images/orange-icon.png'; import blueicon from '../images/blue-icon.png';
import './KiteMap.css'

import useFetch from './useFetch';


const KiteMap = () => {

  const { data, setData, isPending, error, formular } = useFilterForm();
  const { data: favourites, isPending: favouriteIsPending,} = useFetch("https://606cae1c603ded0017502834.mockapi.io/favourites")
  const [isOpen, setIsOpen] = useState(false);


  useEffect(() => {
    if (!favouriteIsPending && !isPending) {
      const locationData = data.map(x => {
        const flag = favourites.some(favourite => parseInt(favourite.spot) === parseInt(x.id))
        return {
          month: x.month,
          probability: x.probability,
          long: x.long,
          lat: x.lat,
          country: x.country,
          name: x.name,
          createdAt: x.createdAt,
          id: x.id,
          favourite: flag
        }
      })
      console.log('locationdata', locationData);
      setData(locationData);
    }
    
    console.log('am intrat in useeffect kitemap')

  }, [favourites, isPending, favouriteIsPending,setData])
  
  const COLOR1={backgroundColor: 'orange'}
  const COLOR2={backgroundColor: 'blue'}
  const blueIcon = new Icon({
    iconUrl: orangeicon,
    iconSize: [25, 41],
  });
  const orangeIcon = new Icon({
    iconUrl: blueicon,
    iconSize: [25, 41],
  });;


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
           
            icon={location.favourite ? blueIcon : orangeIcon}
            key={location.id}
            position={[location.lat, location.long]}

          >
            <Popup
              position={[location.lat, location.long]}
            >
              <div>

                <h2>{location.name}</h2> <p>{data.indexOf(location)}</p>
                <p> LocationID<br />{location.probability}</p>
                <p> WIND PROBABILITY<br />{location.probability}</p>
                <p>LATITUDE <br />{location.lat}</p>
                <p>LONGITUDE<br /> {location.long}</p>
                <p>BEST PERIOD OF TIME <br /> {location.month} </p>
                <button onClick={(e) => {
                  e.preventDefault();
                  setData(prevState => prevState.map(item => {
                    if (item.id === location.id) {
                      return {
                        ...item,
                        favourite: location.favourite ? false : true
                      }
                    }
                    return item
                  }));
                  
                }} style={location.favourite ? COLOR1 : COLOR2} className='addFavoritesButton'>Add to favorites</button>
              </div>
            </Popup>)
          </Marker>)}

      </MapContainer>

    </div>
  )

}

export default KiteMap