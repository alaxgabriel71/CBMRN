import { useState, useContext } from 'react'

import { UserContext } from '../components/contexts/UserContext'
import api from '../services/api'

export default function Users() {

    const [users, setUsers] = useState([])

    const { user } = useContext(UserContext)

    api.defaults.headers.Authorization = `Bearer ${user.token}`

    api.get('/users')
        .then(({data}) => {
            setUsers(data.users)
        })
        .catch(err => {
            console.error(err.message)
        })

    return (
        <article>
            <h1>Usuários</h1>
            <ul>
                {users.map(user => (
                    <li key={user._id}>{user.name} - {user.email}</li>
                ))}
            </ul>
        </article>
    )
}