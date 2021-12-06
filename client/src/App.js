import './App.css';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import DashAdm from './pages/DashAdm';
import DashEmp from './pages/DashEmp';
import DashCust from './pages/DashCust';
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashadm" element={<DashAdm />} />
          <Route path="/dashEmp" element={<DashEmp />} />
          <Route path="/dashcust" element={<DashCust />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/editprofile" element={<EditProfile />} />
        </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
