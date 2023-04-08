import Chat from './Chat';
import Sidebar from './Sidebar';
import Login from './Login';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css';
import { useStateValue } from './StateProvider';


function App() {
  const [{user}, dispatch] = useStateValue()
  return (
    <div className="app">
      {!user ? (
        < Login/>
      ):(
          <div className="app_body">
        <Router>
          <Sidebar/>
          <Routes>
            <Route path='/'>
            </Route>
            <Route path='/app' element={<Chat/>}>
            </Route>
            <Route path='/rooms/:roomId' element={<Chat/>}>
            </Route>
          </Routes>
        </Router>
      </div>
      ) }
      
    </div>
  );
}

export default App;
