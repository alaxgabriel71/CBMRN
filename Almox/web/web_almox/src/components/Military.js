import { useState } from 'react'
import api from '../services/api'

export default function Military({ id, name, rank, handleClick }) {
    const [isHovering, setIsHovering] = useState(false)
    var [milRank, setRank] = useState(rank)

    const handleClickInc = () => {
        setRank(milRank + 1)
        api.put(`/military/${id}`, {
            name: name,
            rank: rank + 1
        })
            .then(response => {
                console.log(response.status)
                window.location.reload(false)
            })
            .catch(err => console.error(err))
    }

    const handleClickDec = () => {
        setRank(milRank - 1)
        api.put(`/military/${id}`, {
            name: name,
            rank: rank - 1
        })
            .then(response => {
                console.log(response.status)
                window.location.reload(false)
            })
            .catch(err => console.error(err))
    }

    const handleClickDel = () => {
        api.delete(`/military/${id}`)
            .then(response => {
                console.log(response.status)
                window.location.reload(false)
            })
            .catch(err => console.error(err))
    }

    return (
        <ul>
            <li onMouseOver={() => setIsHovering(true)} onMouseOut={() => setIsHovering(false)}>
                <h3>{name}</h3>

                {isHovering && (
                    <div>
                        <button onClick={handleClickInc}>^</button>
                        <button onClick={handleClickDec}>v</button>
                        <button onClick={handleClickDel}>x</button>
                    </div>
                )}
            </li>
        </ul>
    )
}