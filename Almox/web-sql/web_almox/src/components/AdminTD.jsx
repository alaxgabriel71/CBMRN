import { useState, useEffect } from 'react'

import api from '../services/api'

export default function AdminTD({id, level, handleClick}) {
    const [isHovering, setIsHovering] = useState(false)
    const [adminLevels, setAdminLevels] = useState([])
    const [newAdminLevel, setNewAdminLevel] = useState()

    useEffect(() => {
        api.get("/admin")
            .then(({data}) => setAdminLevels(data.adminLevels))
            .catch(err => console.error(err))
    }, [id, newAdminLevel])

    /* function handleClick(event) {
        setNewAdminLevel(event.target.value)
        console.log("evento", event.target.value)
        setNewAdminLevel(event.target.value)
        console.log(id, newAdminLevel)
    } */
    
    return(
        <td onMouseOver={() => setIsHovering(true)} onMouseOut={() => setIsHovering(false)}>
            {isHovering && (
                <select value={newAdminLevel} onChange={e => {handleClick(id, e.target.value)}}>
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