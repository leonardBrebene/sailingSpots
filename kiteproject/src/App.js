import './App.css';
import KiteMap from './components/KiteMap';
import KiteTable from './components/KiteTable';
import SignUp from './components/SignUp';
import { Container } from 'react-bootstrap'


function App() {
  return (
    <div>
      <Container className='d-flex align-item-center justify-content-center'>
        <SignUp />
      </Container>



      <KiteMap />
      <KiteTable />

    </div>


  );
}

export default App;
