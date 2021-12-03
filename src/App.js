import Homepage from './components/Homepage';
import Login from './components/Login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path='/' element={<Homepage/>}></Route>
            {/*<Route exact path='/' element={<PrivateRoute/>}>*/}
              <Route path='/login' element={<Login/>}/>
            {/*</Route>*/}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
