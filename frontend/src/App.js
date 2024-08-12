import EditPage from "./components/pages/EditPage";
import HomePage from "./components/pages/HomePage";
import LoginPage from "./components/pages/LoginPage";
import RegistrationPage from "./components/pages/RegistrationPage";
import {BrowserRouter as Router ,Route,Switch,Redirect} from 'react-router-dom';
import UserContext from "./components/providers/UserContext";
import { useContext } from "react";
function App() {
  const Ctx = useContext(UserContext)
  return (

    <Router>
      <Switch>
        <Route exact path='/'>
              <RegistrationPage/>
        </Route>

        <Route  path='/login'>
              <LoginPage/>
        </Route>

        <Route  path='/home'>
          {Ctx.isLoggedIn ?  <HomePage/> : <Redirect to='/login' />}
        </Route>

        <Route  path='/edituser'>
            {Ctx.isLoggedIn ?  <EditPage/> : <Redirect to='/login' />}
         </Route>

         <Route path='*'>
            <Redirect to={Ctx.isLoggedIn ? '/' : '/login'} />
          </Route>
        
      </Switch>
    </Router>
    
  );
}

export default App;
