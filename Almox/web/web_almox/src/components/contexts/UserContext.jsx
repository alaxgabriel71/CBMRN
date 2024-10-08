import { createContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../services/api'

export const UserContext = createContext()

export const UserProvider = ({children}) => {
    var loggedUser
    if(!localStorage.getItem('user')) loggedUser = ''
    else loggedUser = JSON.parse(localStorage.getItem('user'))
    
    const [user, setUser] = useState(loggedUser)
    const [isAuthenticated, setIsAuthenticated] = useState(!!loggedUser)
    const [login, setLogin] = useState(false)

    const navigate = useNavigate()

    
    useEffect(() => {
        if(user) {
            api.defaults.headers.Authorization = `Bearer ${user.token}`
            api.get('/auth')
                .then(({data}) => {
                    console.log('auth1', data.auth)
                    if(!data.auth) navigate('/login')
                    else setIsAuthenticated(true)
                })
                .catch(err => {
                    console.error(err)
                    setIsAuthenticated(false)
                    navigate('/login')
                })
        }
    }, [setIsAuthenticated, user, navigate])
    
    function saveLoggedUser(loggedUser) {
        localStorage.setItem('user', JSON.stringify(loggedUser))
        setUser(loggedUser)

        //api.defaults.headers.Authorization = `Bearer ${user.token}`
    }

    return(
        <UserContext.Provider 
            value={{ login, setLogin, user, isAuthenticated, setIsAuthenticated, saveLoggedUser }}
        >
            {children}
        </UserContext.Provider>
    )
}