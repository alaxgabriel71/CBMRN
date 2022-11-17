import { Routes, Route } from 'react-router-dom'

import { UserProvider } from './components/contexts/UserContext'

import './App.css';
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import Home from './pages/Home'
import MaterialsList from './pages/MaterialsList'
import MovementHistory from './pages/MovementHistory'
import MilitaryList from './pages/MilitaryList'
import NewMaterials from './pages/NewMaterials'
import ReturnMaterials from './pages/ReturnMaterials'
import NewMilitary from './pages/NewMilitary'
import MaterialsTabs from './pages/MaterialsTabs'
import MilitaryTabs from './pages/MilitaryTabs'
import Login from './pages/Login'

function App() {

  return (
    <>
      <UserProvider>
        <NavBar className="App-header" />
        <Routes className="App-main">
          <Route exact path="/" element={<Home />} />
          <Route path="/materials-list" element={<MaterialsList />} />
          <Route path="/movement-history" element={<MovementHistory />} />
          <Route path="/military-list" element={<MilitaryList />} />
          <Route path="/new-materials" element={<NewMaterials />} />
          <Route path="/return-materials" element={<ReturnMaterials />} />
          <Route path="/new-military" element={<NewMilitary />} />
          <Route path="/materials-tabs" element={<MaterialsTabs />} />
          <Route path="/military-tabs" element={<MilitaryTabs />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Footer className="App-footer" />
      </UserProvider>
    </>
  );
}

export default App;
