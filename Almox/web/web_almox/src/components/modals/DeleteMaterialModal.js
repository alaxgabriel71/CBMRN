import styles from './DeleteMaterialModal.module.css'
import api from '../../services/api'

export default function DeleteMaterialModal({show, onClose, materialId, materialName, materialQuantity}){
    var dateObject = new Date()
    const today = dateObject.getDate()+'/'+(dateObject.getMonth()+1)+'/'+dateObject.getFullYear()

    if(!show) return null

    const deleteMaterial = () => {
        console.log("tentando deletar...")
        api.delete(`/materials/${materialId}`)
            .then(response => console.log(response.status))
            .then(() => {
                const description = `${materialQuantity}x ${materialName} foi(foram) excluídos do almoxarifado em ${today}`
                
                api.post('/movements', {
                    operation: "Exclusão",
                    date: today,
                    description 
                })
                    .then(response => response.status)
                    .catch(err => console.error(err))
            })
            .catch(err => console.error(err))
        // window.location.reload(false)
    }
    
    return(
        <div className={styles.modal}>
            <div className={styles.modal_content}>
                <div className={styles.modal_header}>
                    <h4 className={styles.modal_title}>Deletar Material</h4>
                </div>
                <div className={styles.modal_body}>
                    <p>Deseja excluir definitivamente da lista o material: {materialName}?</p>
                </div>
                <div className={styles.modal_footer}>
                    <button onClick={onClose} className={styles.button}>Cancelar</button>
                    <button onClick={deleteMaterial}>Excluir material</button>
                </div>
            </div>
        </div>
    )
}