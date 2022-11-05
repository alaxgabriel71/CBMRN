import { useState } from 'react'

import styles from './Material.module.css'

import UpdateMaterialModal from './modals/UpdateMaterialModal'
import DeleteMaterialModal from './modals/DeleteMaterialModal'
import TakeCareMaterialModal from './modals/TakeCareMaterialModal'

export default function Material({ name, quantity, id }) {
    const [isHovering, setIsHovering] = useState(false)
    const [showUpdate, setShowUpdate] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [showTakeCare, setShowTakeCare] = useState(false);

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

    const takeCareMaterial = () => {
        setShowTakeCare(true)
    }

    return (
        <div /* className={styles.Material_container} */ onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
            <div className={styles.Material_item}>
                <h3 className={styles.Title}>{quantity}x {name}</h3>
                {isHovering && (
                    <div className={styles.Material_options}>
                        <button onClick={() => takeCareMaterial()}>Cautelar</button>
                        <button onClick={() => updateMaterial()}>Editar</button>
                        <button onClick={() => deleteMaterial()}>Deletar</button>
                    </div>
                )}
            </div>
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
                materialQuantity={quantity}
                materialId={id}
            />
            <TakeCareMaterialModal
                onClose={() => setShowTakeCare(false)}
                show={showTakeCare}
                materialId={id}
                materialName={name}
                materialQuantity={quantity}
            />
        </div>
    )
}