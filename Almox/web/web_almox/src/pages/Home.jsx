import { useContext } from 'react'
import { UserContext } from '../components/contexts/UserContext'
import { useEffect } from 'react'
import { useNavigate } from "react-router-dom"

export default function Home(){
    
    // const { email, password } = useContext(UserContext)
    // const { email, password } = JSON.parse(localStorage.getItem('user'))
    const navigate = useNavigate()
    const { user } = useContext(UserContext)

    console.log('user home', user)

    useEffect(() => {
        if(!user) navigate('/login')
    }, [navigate, user])

    return (
        <article>
            <h2>Página Inicial</h2>
        </article>
    )
}