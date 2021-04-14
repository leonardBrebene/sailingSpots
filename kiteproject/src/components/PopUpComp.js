import { Popup, Marker} from 'react-leaflet'
import { useState } from 'react'
import deleteObject from './deleteObject';
import PostObject from './PostObject';
import { Icon } from 'leaflet';
import orangeicon from '../images/orange-icon.png'; import blueicon from '../images/blue-icon.png';

const PopUpComp = ({ initialDataP, dataP, }) => {
    const [initialData, setInitialData] = useState(initialDataP);
    const [data, setData] = useState(dataP);

    const blueIcon = new Icon({
        iconUrl: orangeicon,
        iconSize: [25, 41],
    });
    const orangeIcon = new Icon({
        iconUrl: blueicon,
        iconSize: [25, 41],
    });;

    console.log('dataP', dataP)

    return (
        <div>
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
                                    else { PostObject('favourites', { spot: location.id, createdAt: new Date() }); }
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
                </Marker>
            )}   
        </div>
    )
}
export default PopUpComp
