import { useState, useContext, useEffect } from 'react'
import { Table } from 'react-bootstrap'

import { UserContext } from '../components/contexts/UserContext'
import api from '../services/api'

import AdminTD from '../components/AdminTD'
import RankTD from '../components/RankTD'
import ActiveTD from '../components/ActiveTD'

export default function Users() {

    const { user, adminLevels, ranks } = useContext(UserContext)
    
    const [users, setUsers] = useState([])
    //const [admins, setAdmins] = useState(adminLevels)


    api.defaults.headers.Authorization = `Bearer ${user.token}`

    useEffect(() => {
        api.get('/users')
            .then(({data}) => {
            setUsers(data.users)
            })
            .catch(err => {
            console.error(err.message)
            })
    }, [])

    function getLevel(id) {
        let level = ''
        adminLevels.forEach(admin => {
            if(id === admin._id) {
                level = admin.level
            }
        })
        return level
    }

    function getRank(id) {
        let rank = ''
        ranks.forEach(rk => {
            if(id === rk._id){
                rank = rk.rank
            }
        })
        return rank
    }

    const handleAdminLevelUpdate = (id, newLevel) => {
        api.put(`/users/admin-level/${id}`, { 
            admin: Number(newLevel) 
        })
            .then(() => {
                window.location.reload(false)
            })
            .catch(err => console.error(err))

    }

    const handleRankUpdate = (id, newRank) => {
        api.put(`/users/rank/${id}`, { 
            rank: newRank 
        })
            .then(() => {
                window.location.reload(false)
            })
            .catch(err => console.error(err))
    }

    const handleActiveUpdate = (id, newStatus) => {
        api.put(`/users/active/${id}`, { 
            active: newStatus 
        })
            .then(() => {
                window.location.reload(false)
            })
            .catch(err => console.error(err))
    }

    const handleDelete = (id) => {
        console.log(id, "excluir")
        api.delete(`/users/${id}`)
            .then(() => {
                window.location.reload(false)
            })
            .catch(err => console.error(err))
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
                        <th>Ativo</th>
                    </tr>
                </thead>
                <tbody>
                    {users?.map(user => (
                        <tr key={user._id}>
                            <td disabled={!user.active}>{user._id}</td>
                            <RankTD disabled={!user.active} id={user._id} rank={getRank(user.rank)} handleRankUpdate={handleRankUpdate} />
                            <td disabled={!user.active}>{user.qra}</td>
                            <td disabled={!user.active}>{user.email}</td>
                            <AdminTD disabled={!user.active} id={user._id} level={getLevel(user.admin)} handleAdminLevelUpdate={handleAdminLevelUpdate}/>
                            {/* <td>{user.active && (<p>Active</p>)}</td> */}
                            <ActiveTD id={user._id} status={user.active} handle={handleActiveUpdate} handleDelete={handleDelete}/>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </article>
    )
}