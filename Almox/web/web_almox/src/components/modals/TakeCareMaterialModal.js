import { useState } from 'react'

import styles from './TakeCareMaterialModal.module.css'

export default function TakeCareMaterialModal({show, onClose, materialId, materialName, materialQuantity}){
    const options = [
        {value: '', text: "-- Selecione um militar --"},
        {value: "Militar 1", text: "Militar 1"},
        {value: "Militar 2", text: "Militar 2"},
    ]
    
    const [takeCareQuantity, setTakeCareQuantity] = useState(1)
    const [military, setMilitary] = useState(options[0].value)

    if(!show) return null

    const takeCareMaterial = (event) => {
        event.preventDefault()
        console.log(`${takeCareQuantity}x ${materialName} foram cautelados por ${military}`)
    }

    return (
        <div className={styles.modal}>
            <div className={styles.modal_content}>
                <div className={styles.modal_header}>
                    <h4 className={styles.modal_title}>Cautelar Material</h4>
                </div>
                <div className={styles.modal_body}>
                    <h3>{materialName}</h3>
                    <form onSubmit={takeCareMaterial} id="take-care-form">
                        <label>
                            Quantidade:
                            <input 
                            type="number" 
                            min="1" 
                            max={materialQuantity} 
                            defaultValue={materialQuantity}
                            value={takeCareQuantity}
                            onChange={e => setTakeCareQuantity(e.target.value)}
                            required
                            />
                        </label>
                        <label>
                            Cautelado por: 
                            <select name="military" value={military} onChange={event => setMilitary(event.target.value)} required>
                                {options.map((option) => (
                                    <option key={option.value} value={option.value}>{option.text}</option>
                                ))}
                            </select>
                        </label>
                    </form>
                </div>
                <div className={styles.modal_footer}>
                    <button onClick={onClose} className={styles.button}>Cancelar</button>
                    <button type="submit" form="take-care-form">Confirmar cautela de material</button>
                </div>
            </div>
        </div>
    )
}