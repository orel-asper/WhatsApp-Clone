import React from 'react';
import './Style/App.css';
import Sidebar from './Components/Sidebar';
import Chat from './Components/Chat';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from './Components/Login';
import { useStateValue } from './REDUX/StateProvider'


function App() {

  const [{ user }, dispatch] = useStateValue()

  return (
    <div className="app">
      {!user ? (
        <Login />
      ) : (
          <div className="app__body">
            <Router>
              <Sidebar />
              <Switch >
                <Route path="/Rooms/:roomId" >
                  <Chat />
                </Route>
                <Route path="/" >
                  <Chat />
                </Route>
              </Switch>
            </Router>
          </div>

        )}
    </div>
  );
}

export default App;
