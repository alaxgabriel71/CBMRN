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
import Users from './pages/Users'

export default function AppRoutes() {
    
    const { user, isAuthenticated } = useContext(UserContext)
    
    const Private = ({ children }) => {
        console.log('auth', isAuthenticated)
        if (!isAuthenticated) {
            return <Navigate to='/login' />
        }

        return children
    }

    const Regular = ({ children }) => {
        if(user.admin === 'none'){
            return <Navigate to='/' />
        }

        return children
    }

    const Moderator = ({ children }) => {
        if(user.admin !== 'moderator' && user.admin !== 'commander') {
            return <Navigate to='/' />
        }

        return children
    }

    const Commander = ({ children }) => {
        if(user.admin !== 'commander') {
            return <Navigate to='/' />
        }

        return children
    }

    return (
        <>
            <NavBar className="App-header" />
            <Routes className="App-main">
                <Route exact path="/" element={<Private><Home /></Private>} />
                <Route path="/materials-list" element={<Private><MaterialsList /></Private>} />
                <Route path="/movement-history" element={<Private><Moderator><MovementHistory /></Moderator></Private>} />
                <Route path="/military-list" element={<Private><Regular><MilitaryList /></Regular></Private>} />
                <Route path="/new-materials" element={<Private><NewMaterials /></Private>} />
                <Route path="/return-materials" element={<Private><ReturnMaterials /></Private>} />
                <Route path="/new-military" element={<Private><Regular><NewMilitary /></Regular></Private>} />
                <Route path="/materials-tabs" element={<Private><MaterialsTabs /></Private>} />
                <Route path="/military-tabs" element={<Private><Regular><MilitaryTabs /></Regular></Private>} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Private><Commander><Register /></Commander></Private>} />
                <Route path="/users" element={<Private><Commander><Users /></Commander></Private>} />
            </Routes>
            <Footer className="App-footer" />
        </>
    )
}