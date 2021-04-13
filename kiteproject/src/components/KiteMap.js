import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { Icon } from 'leaflet';
import FilterPopup from './FilterPopup'
import { useState, useEffect } from 'react'
import FilterForm from './FilterForm'
import filter from '../images/filter.png'
import orangeicon from '../images/orange-icon.png'; import blueicon from '../images/blue-icon.png';
import './KiteMap.css'
import useFetch from './useFetch';
import PopUpComp from './PopUpComp';
import deleteObject from './deleteObject';
import postObject from './postObject';


const KiteMap = () => {
  const { data, isPending, error, setData } = useFetch("https://606cae1c603ded0017502834.mockapi.io/spot");
  const { data: favourites, isPending: favouriteIsPending, } = useFetch("https://606cae1c603ded0017502834.mockapi.io/favourites")
  const [isOpen, setIsOpen] = useState(false);
  const [initialData, setInitialData] = useState(null);


  useEffect(() => {

    if (!favouriteIsPending && !isPending) {                     //ziua in care am inteles cum merge destructurarea
      setData((prevState => prevState.map(item => {
        const item2 = favourites.some(favourite => parseInt(favourite.spot) === parseInt(item.id))
        return {
          ...item,
          favourite: item2
        }
      })))
      console.log('favourites', favourites)
    }


    console.log('am intrat in useeffect kitemap')

  }, [isPending, favouriteIsPending, setData, favourites])

  console.log('initialdata', initialData)

  const blueIcon = new Icon({
    iconUrl: orangeicon,
    iconSize: [25, 41],
  });
  const orangeIcon = new Icon({
    iconUrl: blueicon,
    iconSize: [25, 41],
  });;

  const filterData = (item) => {
    setData(initialData.filter((location) => {
      return location.country.toLowerCase().includes(item.country.toLowerCase()) && location.probability >= item.windProb;
    }))
  }

  return (

    <div>

      <div className='addSpotButton'>Adds Spot</div>
      {error && <div>{error}</div>}
      {isPending && <div>Loading..</div>}

      <MapContainer center={[35.505, 10.09]} zoom={3} scrollWheelZoom={true}  >
        <TileLayer
          onClick={() => { setInitialData(data); }}
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <div onClick={() => {
          setIsOpen(true); initialData === null && setInitialData(data);
        }} ><img className='filterButton' src={filter} alt='filter' /></div>

        <FilterPopup open={isOpen} closeIt={() => { setIsOpen(false) }} >
          <FilterForm onFilter={filterData} />
        </FilterPopup>

        {isOpen === true && <FilterForm onFilter={filterData} />}

        <Marker
          position={[45.097, 25.444]}>
          <Popup>
            Homeland
          </Popup>
        </Marker>

        {/* {data && <PopUpComp  initialDataP={initialData}  dataP ={data} />} // am incercat sa integrez Marker intr-o alta componenta*/} 
        {data.map(location =>
          <Marker 

            icon={location.favourite ? blueIcon : orangeIcon}
            key={location.id}
            position={[location.lat, location.long]}
            onClick={initialData === null && setInitialData(data)}
          >

            <Popup                                           
              position={[location.lat, location.long]}
              onClick={initialData === null && setInitialData(data)}
            >
              <div>

                <h2>{location.name}</h2> <p>{data.indexOf(location)}</p>
                <p> LocationID<br />{location.probability}</p>
                <p> WIND PROBABILITY<br />{location.probability}</p>
                <p>LATITUDE <br />{location.lat}</p>
                <p>LONGITUDE<br /> {location.long}</p>
                <p>BEST PERIOD OF TIME <br /> {location.month} </p>
                <button
                  style={location.favourite ? { backgroundColor: 'orange' } : { backgroundColor: 'blue' }} className='addFavoritesButton'
                  onClick={(e) => {
                    e.preventDefault();
                    if (location.favourite) { deleteObject('spot', location.id); }
                      else {postObject('favourites',{spot:location.id, createdAt:new Date()} ); }
                    const tempData = (data => data.map(item => {
                      if (item.id === location.id) {
                        return {
                          ...item,
                          favourite: location.favourite ? false : true
                        }
                      }
                      return item
                    }));
                    setData(tempData); setInitialData(tempData);
                  }} >Add to favorites</button>
              </div>
            </Popup>)
          </Marker>)}

      </MapContainer>

    </div>
  )

}

export default KiteMap