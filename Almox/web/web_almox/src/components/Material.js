import { useState } from 'react'

import UpdateMaterialModal from './modal/UpdateMaterialModal'

export default function Material({name, quantity, id}){
    const [isHovering, setIsHovering] = useState(false)
    const [show, setShow] = useState(false);

    const handleMouseOver = () => {
        setIsHovering(true)
    }

    const handleMouseOut = () => {
        setIsHovering(false)
    }

    const updateMaterial = (id, name, quantity) => {
        setShow(true)
    }

    return(
        <li onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
            <h3>{quantity}x {name}</h3>
            {isHovering &&(
                <button onClick={() => updateMaterial(id, name, quantity)}>Editar</button>
            )}
            <UpdateMaterialModal 
                onClose={() => setShow(false)} 
                show={show} 
                materialName={name}
                materialId={id}
                materialQuantity={quantity}
            />
        </li>
    )
}