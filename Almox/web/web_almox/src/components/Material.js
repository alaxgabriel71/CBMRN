import { useState } from 'react'

export default function Material({name, quantity}){
    const [isHovering, setIsHovering] = useState(false)

    const handleMouseOver = () => {
        setIsHovering(true)
    }

    const handleMouseOut = () => {
        setIsHovering(false)
    }

    return(
        <li onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
            <h3>{quantity}x {name}</h3>
            {isHovering &&(
                <button>Editar</button>
            )}
        </li>
    )
}