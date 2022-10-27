import { useState } from 'react'

import styles from './UpdateMaterialModal.module.css'
import api from '../../services/api'

export default function UpdateMaterialModal({ show, onClose, materialName, materialId, materialQuantity }) {
    if (!show) {
        return null
    }

    const [newName, setNewName] = useState();
    const [newQuantity, setNewQuantity] = useState();

    
    /* function updateMaterial(){
        // event.preventDefault();
        var materialExists = false;
        var currentQuantity = 0;
        var currentMaterialID = '';
        var idToUpdate = '';
        const updatedMaterial = {
            name: '',
            quantity: ''
        };
   

        materials.forEach(material => {
            if(material.name.toLowerCase() === newName.toLowerCase()) {
                materialExists = true
                currentQuantity = material.quantity
                currentMaterialID = material._id
                console.log(`Quantidade atual = ${currentQuantity}; Nova quantidade = ${newQuantity}`)
            }
        })

        
        if(materialExists){
            const totalQuantity = Number(currentQuantity) + Number(newQuantity)
            console.log(totalQuantity)
            updatedMaterial = {
                name: newName,
                quantity: totalQuantity
            }
            idToUpdate = currentMaterialID
        } else {
            updatedMaterial = {
                name: newName,
                quantity: Number(newQuantity)
            }
            idToUpdate = materialId
        }

        api.put(`/materials/${materialId}`, updatedMaterial)
            .then((response) => {
                console.log("Update status: "+response.status)
            })
            .catch(err => console.error(err))
    } */
    
    return (
        <div className={styles.modal}>
            <div className={styles.modal_content}>
                <div className={styles.modal_header}>
                    <h4 className={styles.modal_title}>Editar Material</h4>
                </div>
                <div className={styles.modal_body}>
                    <form id="update-form" onSubmit={updateMaterial}>
                        <label>
                            Quantidade
                            <input 
                                type="number" 
                                min="1" 
                                defayltValue={materialQuantity}
                                value={newQuantity}
                                onChange={event => setNewQuantity(event.target.value)}
                                required
                            />
                        </label>
                        <label>
                            Nome
                            <input 
                                type="text" 
                                defaultValue={materialName}
                                value={newName}
                                onChange={event => setNewName(event.target.value)}
                                required 
                            />
                        </label>
                    </form>
                </div>
                <div className={styles.modal_footer}>
                    <button onClick={onClose} className={styles.button}>Cancelar</button>
                    <button type="submit" form="update-form">Salvar Edição</button>
                </div>
            </div>
        </div>
    )
}