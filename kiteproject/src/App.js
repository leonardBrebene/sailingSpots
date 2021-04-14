import './App.css';
import KiteMap from './components/KiteMap';
import KiteTable from './components/KiteTable';
import SignUp from './components/SignUp';
import { Container } from 'react-bootstrap'
import AuthProvider from './contexts/AuthContext';
import {BrowserRouter as Router,Switch,Route}from 'react-router-dom'
import DashBoard from './components/DashBoard';
import LoginComp from './components/LoginComp';


function App() {
  return (
    <div>
          <Router>
            <Switch>
            <Route path ='/sign-up' component ={SignUp}/>
            <Route path='/login' component={LoginComp}/>
            <Route exact path="/" component={DashBoard}/>
            </Switch>
          </Router>
    </div>


  );
}

export default App;
