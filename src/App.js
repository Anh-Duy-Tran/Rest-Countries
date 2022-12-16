import './App.css';
import { BrowserRouter, Routes as Router, Route } from 'react-router-dom'
import { UserProvider } from './context/UserProvider';
import Mainpage from './pages/mainpage/Mainpage';
import Country from './pages/country/Country';

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Router>
          
          <Route path="/" element={<Mainpage/>}/>

          <Route path="/country/:id" element={<Country/>}/>

        </Router>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
