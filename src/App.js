import React from 'react';
import './App.css';
import MainFrame from './views/main/index'
import Login from './views/login'
import { BrowserRouter as Router, Route} from "react-router-dom";


function App() {
  return (
    <div className="App">
       <Router>
          <Route path="/" exact component={MainFrame} />
          <Route path="/login/" exact component={Login} />  
        </Router>
    </div>
  )
}

export default App;

