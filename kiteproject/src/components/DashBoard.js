import KiteMap from "./KiteMap";
import KiteTable from "./KiteTable";
import { Button, Card } from 'react-bootstrap'
import { useHistory} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faUserAlt} from  '@fortawesome/free-solid-svg-icons'


const DashBoard=()=>{
    const history = useHistory()
     function handleLogOut (){
        history.push('/login'); 
     }

    return(
        <>
        
           <Card style={{border:'none'}} className='d-inline' >
           <h3 className='text-left' >KiteSurf</h3>
           <FontAwesomeIcon icon={faUserAlt} style={{position:'relative', color:'blue', left:'97%',bottom:'30px', fontSize: '24px'}} />
           <Button  onClick={handleLogOut} style={{marginLeft:'94%'}} >LogOut</Button>
            </Card>

        <KiteMap/>
        <KiteTable/>
        </>
    )

}
export default DashBoard