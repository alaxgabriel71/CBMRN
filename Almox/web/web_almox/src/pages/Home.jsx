// import { useContext } from 'react'
// import { UserContext } from '../components/contexts/UserContext'

export default function Home(){
    
    // const { email, password } = useContext(UserContext)
    const { email, password } = JSON.parse(localStorage.getItem('user'))
    return (
        <article>
            <h2>Página Inicial</h2>
            <h5>{email}</h5>
            <h5>{password}</h5>
        </article>
    )
}