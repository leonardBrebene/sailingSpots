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
           <Card style={{border:'none',display:'inline'}}  >
           <h3 className='text-left' >KiteSurf</h3>
           <FontAwesomeIcon icon={faUserAlt} style={{position:'relative', color:'blue', right:'10px',bottom:'30px',float:'right', fontSize: '24px'}} />
           <Button  onClick={handleLogOut} style={{position:'relative', width:'100px',float:'right',left:'20px',bottom:'3px'}} >LogOut</Button>
            </Card>

        <KiteMap/>
        <KiteTable/>
        </>
    )

}
export default DashBoard