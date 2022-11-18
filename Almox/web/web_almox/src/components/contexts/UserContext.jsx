import { createContext, useState, useEffect } from 'react'

import Loading from '../Loading'

export const UserContext = createContext()

export const UserProvider = ({children}) => {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))
    const [userLoading, setUserLoading] = useState(false)
    const [login, setLogin] = useState(false)
    
    function saveLoggedUser(loggedUser) {
        localStorage.setItem('user', JSON.stringify(loggedUser))
        setUser(loggedUser)
    }

    if(userLoading){
        return <Loading loading={true} />
    }

    return(
        <UserContext.Provider 
            value={{ email, setEmail, password, setPassword, userLoading, setUserLoading, login, setLogin, user, saveLoggedUser }}
        >
            {children}
        </UserContext.Provider>
    )
}