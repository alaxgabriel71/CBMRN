import { Routes, Route } from 'react-router-dom'

import './App.css';
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import Home from './pages/Home'
import MaterialsList from './pages/MaterialsList'
import MovimentHistory from './pages/MovimentHistory'
import MilitaryList from './pages/MilitaryList'
import NewMaterials from './pages/NewMaterials'
import ReturnMaterials from './pages/ReturnMaterials'
import NewMilitary from './pages/NewMilitary'

function App() {
  return (
    <>
      <NavBar className="App-header"/>
      <Routes className="App-main">
        <Route exact path="/" element={<Home />} />
        <Route path="/materials-list" element={<MaterialsList />} />
        <Route path="/moviment-history" element={<MovimentHistory />} />
        <Route path="/military-list" element={<MilitaryList />} />
        <Route path="/new-materials" element={<NewMaterials />} />
        <Route path="/return-materials" element={<ReturnMaterials />} />
        <Route path="/new-military" element={<NewMilitary />} />
      </Routes>
      <Footer className="App-footer"/>
    </>
  );
}

export default App;
