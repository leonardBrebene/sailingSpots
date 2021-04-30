import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import './AddNewSpot.css'
import { useState } from 'react'
import { Button, Card, Container, Form } from 'react-bootstrap'


const AddNewSpot = ({ onAddNewSpot, closeIt }) => {

  const [theSpot, setTheSpot] = useState({
    month: 'january', probability: 51, long: 25.444, lat: 45.097, country: '', name: '', favourite: false,
    createdAt: '2019-11-25T12:56:18.896Z', id: ''
  })

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
    onAddNewSpot({ theSpot });
  }

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
              setTheSpot({
                ...theSpot,
                lat: JSON.stringify(e.target._latlng.lat).slice(0, 6),
                long: JSON.stringify(e.target._latlng.lng).slice(0, 6)
              });
            },
          }}
          position={[theSpot.lat, theSpot.long]}
          draggable={true}
        >
          <Popup  > Drag me</Popup>

        </Marker >

        <Container className='d-flex align-item-left justify-content-left'
          style={{ minHeight: '100vh', position: 'relative', top: '20px', left: '-20%', zIndex: 1000, maxWidth: '300px' }}>
          <div className='w-100' style={{ maxWidth: '200px' }} >

            <Card.Body>
              <h2 className='text-right mb-4' style={{ fontFamily: 'Jazz LET' }}>KiteSurf</h2>

              <Form onSubmit={onSubmit}>
                <Form.Group id='spotName'>
                  <Form.Label>Spot Name</Form.Label>
                  <Form.Control type='text' required onChange={(e) => { setTheSpot({ ...theSpot, name: e.target.value }) }} />
                </Form.Group>

                <Form.Group id='country'>
                  <Form.Label>Country</Form.Label>
                  <Form.Control type='text' required onChange={(e) => { setTheSpot({ ...theSpot, country: e.target.value }) }} />
                </Form.Group>

                <Form.Group id='spotDate'>
                  <Form.Label>Spot Date</Form.Label>
                  <Form.Control type='date' required onChange={(e) => { setTheSpot({ ...theSpot, date: e.target.value }) }} />
                </Form.Group>

                <Button className='w-100 h-20' type='submit' size="sm">Add spot </Button>
                <Button className='w-100 ' variant="danger" size="sm" style={{ marginTop: '5px' }} onClick={closeIt} >Cancel adding </Button>
              </Form>
            </Card.Body>
          </div>
        
        </Container>

      </MapContainer>
    </div>
  )
}
export default AddNewSpot;