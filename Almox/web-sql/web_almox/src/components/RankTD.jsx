import { useState, useContext } from 'react'

import { UserContext } from './contexts/UserContext'

export default function RankTD({id, rank, handleRankUpdate}) {
    const { ranks } = useContext(UserContext)

    const [isHovering, setIsHovering] = useState(false)
    const [newRank] = useState()

    
    return(
        <td onMouseOver={() => setIsHovering(true)} onMouseOut={() => setIsHovering(false)}>
            {isHovering && (
                <select value={newRank} onChange={e => handleRankUpdate(id, e.target.value)}>
                    <option>{rank}</option>
                    {ranks.map(rk => (
                        <option key={rk._id} value={rk._id}>{rk.rank}</option>  
                    ))}
                </select>
            )}
            {!isHovering && rank}
        </td>
    )
}