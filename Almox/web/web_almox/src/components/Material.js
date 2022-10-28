import { useState } from 'react'

import UpdateMaterialModal from './modals/UpdateMaterialModal'
import DeleteMaterialModal from './modals/DeleteMaterialModal'

export default function Material({name, quantity, id}){
    const [isHovering, setIsHovering] = useState(false)
    const [showUpdate, setShowUpdate] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    // const [showTakeCare, setShowTakeCare] = useState(false);

    const handleMouseOver = () => {
        setIsHovering(true)
    }

    const handleMouseOut = () => {
        setIsHovering(false)
    }

    const updateMaterial = () => {
        setShowUpdate(true)
    }

    const deleteMaterial = () => {
        setShowDelete(true)
    }

    return(
        <li onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
            <h3>{quantity}x {name}</h3>
            {isHovering &&(
                <div>
                    <button>Cautelar</button>
                    <button onClick={() => updateMaterial()}>Editar</button>
                    <button onClick={() => deleteMaterial()}>Deletar</button>    
                </div>
            )}
            <UpdateMaterialModal 
                onClose={() => setShowUpdate(false)} 
                show={showUpdate} 
                materialName={name}
                materialId={id}
                materialQuantity={quantity}
            />
            <DeleteMaterialModal
                onClose={() => setShowDelete(false)}
                show={showDelete}
                materialName={name}
                materialId={id}
            />
        </li>
    )
}