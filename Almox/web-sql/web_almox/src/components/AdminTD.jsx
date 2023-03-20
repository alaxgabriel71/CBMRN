import { useState, useEffect, useContext } from 'react'

//import api from '../services/api'
import { UserContext } from './contexts/UserContext'

export default function AdminTD({id, level, handleAdminLevelUpdate}) {
    const { adminLevels } = useContext(UserContext)
    const [isHovering, setIsHovering] = useState(false)
    const [newAdminLevel] = useState()
    
    return(
        <td onMouseOver={() => setIsHovering(true)} onMouseOut={() => setIsHovering(false)}>
            {isHovering && (
                <select value={newAdminLevel} onChange={e => {handleAdminLevelUpdate(id, e.target.value)}}>
                    <option>{level}</option>
                    {adminLevels.map(adminLevel => (
                        ((level !== adminLevel.level) && (
                            <option key={adminLevel._id} value={adminLevel._id}>{adminLevel.level}</option>
                        ))
                    ))}
                </select>
            )}
            {!isHovering && level}
        </td>
    )
}