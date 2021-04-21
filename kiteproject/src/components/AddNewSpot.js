import { MapContainer, TileLayer, Marker, FeatureGroup } from "react-leaflet";
import './AddNewSpot.css'
import { useState } from 'react'


const AddNewSpot = (onAddNewSpot) => {

  const [theSpot, setTheSpot] = useState({month:'',probability:'',long:25.444,lat:45.097,country:'',name:''})


//   {
//     "month": "April",
//     "probability": 100,
//     "long": "163.9900",
//     "lat": "62.4723",
//     "country": "Holy See (Vatican City State)",
//     "name": "Wiegand, Hermann and Donnelly",
//     "createdAt": "2019-11-25T12:56:18.896Z",
//     "id": "21"
// },

  const onSubmit = (e) => {
    e.preventDefault();
  }

  console.log(JSON.stringify(theSpot))
  return (
    <div>
      <MapContainer center={[35.505, 10.09]} zoom={2} scrollWheelZoom={true} className='leaflet-container2' >

        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker
          eventHandlers={{
            dragend: (e) => {
              setTheSpot({...theSpot,lat:e.target._latlng.lat, long:e.target._latlng.lng});
            }
          }}
          position={[theSpot.lat, theSpot.long]}
          draggable={true}
        >
        </Marker>


        <form onSubmit={onSubmit} style={{ zIndex: 1000, position: 'fixed', left: '15%' }}>
          <section>
            <label className='label-field'>Spot Name </label>
            <input className='input-field' type="text" value={theSpot.name} onChange={(e) => {
              setTheSpot({...theSpot,name:e.target.value});
            }} />
          </section>

          <section>
            <label className='label-field'>Country</label>
            <input className='input-field' type="text" value={theSpot.country} onChange={(e) => {
              setTheSpot({...theSpot,country:e.target.value});
            }} />
          </section>



          <button style={{ backgroundColor: 'blue', color: 'aliceblue', borderColor: 'blue', left: '30%', position: 'relative', margin: '10px' }}>Filter</button>

        </form>


      </MapContainer>
    </div>
  )
}
export default AddNewSpot;