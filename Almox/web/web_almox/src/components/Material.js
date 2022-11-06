import { useState } from 'react'
import { Button } from 'react-bootstrap'
import { FaTrash, FaPen, FaBoxOpen } from 'react-icons/fa'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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
        <div className={styles.Material_container} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
            <div className={styles.Material_item}>
                <p className={styles.Title}>{quantity} | {name}</p>
                {isHovering && (
                    <div className={styles.Material_options}>
                        <span data-toggle="popover" data-trigger="hover" title="Cautelar material">
                            <Button className="btn btn-light btn-sm" onClick={() => takeCareMaterial()}>
                                <FaBoxOpen icon="fa-solid fa-box-open" className={styles.MaterialOptionsIcons} />
                            </Button>
                        </span>
                        <span data-toggle="popover" data-trigger="hover" title="Editar material">
                            <Button className="btn btn-light btn-sm" onClick={() => updateMaterial()}>
                                <FaPen icon="fa-solid fa-pencil" className={styles.MaterialOptionsIcons} />
                            </Button>
                        </span>
                        <span data-toggle="popover" data-trigger="hover" title="Deletar material" >
                            <Button className="btn btn-light btn-sm" onClick={() => deleteMaterial()}>
                                <FaTrash icon="fa-solid fa-trash" className={styles.MaterialOptionsIcons} />
                            </Button>
                        </span>
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