import { useState } from 'react'

export default function Military({ name, rank }) {
    const [isHovering, setIsHovering] = useState(false)
    var [milRank, setRank] = useState(rank)

    const handleClickInc = () => {
        setRank(milRank + 1)
        window.location.reload()
    }

    const handleClickDec = () => {
        setRank(milRank - 1)
        window.location.reload()
    }

    return (
        <li onMouseOver={() => setIsHovering(true)} onMouseOut={() => setIsHovering(false)}> 
            <h3>{name} - {milRank}</h3>

            {isHovering && (
                <div>
                    <button onClick={handleClickInc}>^</button>
                    <button onClick={handleClickDec}>v</button>
                    <button>x</button>
                </div>
            )}
        </li>
    )
}