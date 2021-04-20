import { MapContainer,TileLayer, Marker, } from "react-leaflet";
import './AddNewSpot.css'


const AddNewSpot=()=>{
    return(
    <div >
        <MapContainer center={[35.505, 10.09]} zoom={3} scrollWheelZoom={true} className='leaflet-container2'  >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        </MapContainer>
        </div>
    )
}
export default AddNewSpot;