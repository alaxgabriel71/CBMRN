import { Routes, Route } from 'react-router-dom'


import './App.css';
import NavBar from './components/NavBar'
import Home from './pages/Home'
import MaterialsList from './pages/MaterialsList'
import MovimentHistory from './pages/MovimentHistory'
import MilitaryList from './pages/MilitaryList'

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route exact path="/" element={<Home />}/>
        <Route path="/materials-list" element={<MaterialsList />}/>
        <Route path="/moviment-history" element={<MovimentHistory />}/>
        <Route path="/military-list" element={<MilitaryList />}/>
      </Routes>
    </>
  );
}

export default App;
