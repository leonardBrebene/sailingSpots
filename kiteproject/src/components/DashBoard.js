import KiteMap from "./KiteMap";
import KiteTable from "./KiteTable";
import { Button, Card } from 'react-bootstrap'
import { useHistory} from 'react-router-dom'

const DashBoard=()=>{
    const history = useHistory()
     function handleLogOut (){
        history.push('/login'); 
     }

    return(
        <>
           <Card style={{border:'none'}}>
           <h3 className='text-left mb-2'>KiteSurf</h3>
           <Button  onClick={handleLogOut} style={{marginLeft:'94%', marginRight:'1%'}} >LogOut</Button>
            </Card>

        <KiteMap/>
        <KiteTable/>
        </>
    )

}
export default DashBoard