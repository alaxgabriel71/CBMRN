import { useState, useContext, useEffect } from 'react'
import { Table } from 'react-bootstrap'

import { UserContext } from '../components/contexts/UserContext'
import api from '../services/api'

export default function Users() {

    const [users, setUsers] = useState([])
    const [admins, setAdmins] = useState([])

    const { user } = useContext(UserContext)

    api.defaults.headers.Authorization = `Bearer ${user.token}`

    useEffect(() => {
        api.get('/users')
            .then(({data}) => {
            setUsers(data.users)
            })
            .catch(err => {
            console.error(err.message)
            })

        api.get('/admin')
            .then(({data}) => {
                setAdmins(data.adminLevels)
            })
            .catch(err => console.error(err.message))
    }, [])

    function getLevel(id) {
        let level = ''
        admins.map(admin => {
            if(id === admin._id) {
                level = admin.level
            }
        })
        return level
    }

    
    return (
        <article>
            <h1>Usuários</h1>
            
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Patente</th>
                        <th>QRA</th>
                        <th>Email</th>
                        <th>Administrador</th>
                    </tr>
                </thead>
                <tbody>
                    {users?.map(user => (
                        <tr key={user._id}>
                            <td>{user._id}</td>
                            <td>{user.rank}</td>
                            <td>{user.qra}</td>
                            <td>{user.email}</td>
                            <td>{getLevel(user.admin)}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </article>
    )
}