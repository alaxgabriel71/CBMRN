import { useContext } from 'react'
import { Routes, Route } from 'react-router-dom'

import { UserContext } from './components/contexts/UserContext'
//import { AuthProvider } from './components/contexts/AuthContext'

import { Navigate } from 'react-router-dom'

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
import Register from './pages/Register';

export default function AppRoutes() {
    
    const Private = ({ children }) => {
        const { isAuthenticated } = useContext(UserContext)
        console.log('auth', isAuthenticated)
        if (!isAuthenticated) {
            return <Navigate to='/login' />
        }

        return children
    }

    return (
        <>
            <NavBar className="App-header" />
            <Routes className="App-main">
                <Route exact path="/" element={<Private><Home /></Private>} />
                <Route path="/materials-list" element={<Private><MaterialsList /></Private>} />
                <Route path="/movement-history" element={<Private><MovementHistory /></Private>} />
                <Route path="/military-list" element={<Private><MilitaryList /></Private>} />
                <Route path="/new-materials" element={<Private><NewMaterials /></Private>} />
                <Route path="/return-materials" element={<Private><ReturnMaterials /></Private>} />
                <Route path="/new-military" element={<Private><NewMilitary /></Private>} />
                <Route path="/materials-tabs" element={<Private><MaterialsTabs /></Private>} />
                <Route path="/military-tabs" element={<Private><MilitaryTabs /></Private>} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Private><Register /></Private>} />
            </Routes>
            <Footer className="App-footer" />
        </>
    )
}