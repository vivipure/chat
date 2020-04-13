import React from 'react';
import MainFrame from './views/main/index'
import Login from './views/login'
import Register from './views/register'
import { BrowserRouter as Router, Route} from "react-router-dom";


function App() {
  return (
    <div className="App">
       <Router>
          <Route path="/" exact component={MainFrame} />
          <Route path="/login/" exact component={Login} />
          <Route path="/register/" exact component={Register} />
        </Router>
    </div>
  )
}

export default App;

