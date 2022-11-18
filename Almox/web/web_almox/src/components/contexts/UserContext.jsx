import { createContext, useState } from 'react'

export const UserContext = createContext()

export const UserProvider = ({children}) => {
    var loggedUser
    if(!localStorage.getItem('user')) loggedUser = ''
    else loggedUser = JSON.parse(localStorage.getItem('user'))
    
    const [user, setUser] = useState(loggedUser)
    const [login, setLogin] = useState(false)
    
    function saveLoggedUser(loggedUser) {
        localStorage.setItem('user', JSON.stringify(loggedUser))
        setUser(loggedUser)
    }

    return(
        <UserContext.Provider 
            value={{ login, setLogin, user, saveLoggedUser }}
        >
            {children}
        </UserContext.Provider>
    )
}