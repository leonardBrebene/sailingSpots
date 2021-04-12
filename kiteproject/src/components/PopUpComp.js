import { Popup } from 'react-leaflet'
import{useState}from 'react'

const PopUpComp = (  { location, initialDataP, dataP, } ) => {
    const [initialData, setInitialData] = useState(initialDataP);
    const [data, setData] = useState(dataP);
    console.log(dataP)
    return (
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
        </Popup>
    )
}
export default PopUpComp
